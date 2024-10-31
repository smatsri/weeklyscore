import { Module } from '@nestjs/common';
import { WSGateway } from './gateway.service';
import { MessageService } from './message.service';

@Module({
  providers: [WSGateway, MessageService],
  exports: [],
})
export class WsModule {}
