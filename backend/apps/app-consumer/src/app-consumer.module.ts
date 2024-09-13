import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConsumerController } from './app-consumer.controller';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'APP_CONSUMER', transport: Transport.TCP },
    ]),
  ],
  controllers: [AppConsumerController],
  providers: [],
})
export class AppConsumerModule {}
