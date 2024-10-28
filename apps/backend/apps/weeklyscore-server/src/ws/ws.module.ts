import { Module } from '@nestjs/common';
import { WSGateway } from './gateway.service';

@Module({
  providers: [WSGateway],
  exports: [],
})
export class WsModule { }
