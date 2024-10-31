import { Module } from '@nestjs/common';
import { WSGateway } from './gateway.service';
import { MessageService } from './message.service';
import { AuthenticationModule } from '@app/authentication';

@Module({
  imports: [AuthenticationModule],
  providers: [WSGateway, MessageService],
  exports: [],
})
export class WsModule {}
