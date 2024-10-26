import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from '@app/authentication';
import { Request } from 'express';
import { NewSessionManager } from '@app/messaging/services/new-session/manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly newSessionManager: NewSessionManager,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test_event')
  async publishTestEvent() {
    this.appService.publishTestEvent();
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('protected')
  getProtected(@Req() request: Request) {
    return (request as any).user;
  }

  @Get('new-session/test')
  newSessionTest() {
    const correlationId = `test-${new Date().getTime()}`;
    this.newSessionManager.publishCmd(correlationId, 'whats up?');

    return { correlationId };
  }

  @Get('new-session/test/result/:id')
  async getResult(@Req() request: Request) {
    const res = await this.newSessionManager.getResult(request.params.id);
    return res;
  }

  @Post('new-session/test/result/:id')
  async setResult(@Req() request: Request, @Res() response) {
    const value = +request.body?.value;
    if (isNaN(value)) {
      response.status(400).send('invalid value');
      return;
    }
    await this.newSessionManager.publishResult(request.params.id, value);
    return response.sendStatus(200);
  }
}
