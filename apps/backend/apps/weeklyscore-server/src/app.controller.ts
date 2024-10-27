import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from '@app/authentication';
import { Request } from 'express';
import { NewSessionManager } from '@app/messaging/new-session/manager';

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

  @Post('new-session/new')
  newSession() {
    const msgId = `new-session-${new Date().getTime()}`;
    this.newSessionManager.publishCmd(msgId, {
      type: "create-session",
      payload: {
        groupId: "group-1"
      }
    });

    return { msgId };
  }
}
