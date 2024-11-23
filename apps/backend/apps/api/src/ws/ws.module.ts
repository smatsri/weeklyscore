import { Module } from '@nestjs/common';
import { WSGateway } from './gateway.service';
import { AuthenticationModule } from '@app/authentication';

@Module({
  imports: [AuthenticationModule],
  providers: [WSGateway],
  exports: [],
})
export class WsModule {}
