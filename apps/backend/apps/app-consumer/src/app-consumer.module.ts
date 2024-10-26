import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConsumerController } from './app-consumer.controller';
import { MessagingModule } from '@app/messaging';
@Module({
  imports: [
    ClientsModule.register([
      { name: 'APP_CONSUMER', transport: Transport.TCP },
    ]),
    MessagingModule
  ],
  controllers: [AppConsumerController],
  providers: [],
})
export class AppConsumerModule { }
