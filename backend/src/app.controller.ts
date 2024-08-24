import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from '@app/authentication';
import { Request } from 'express';
import { DataService } from '@app/data';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('gen')
  async generate() {
    await this.dataService.generateMockData();
    return { success: true };
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('protected')
  getProtected(@Req() request: Request) {
    return request.user;
  }
}
