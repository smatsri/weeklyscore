import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from '@app/authentication';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('protected')
  getProtected(@Req() request: Request) {
    return request.user;
  }
}
