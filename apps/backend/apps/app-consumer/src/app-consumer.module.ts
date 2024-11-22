import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommandService } from './command';
import { DataModule } from '@app/data';
import { AppConsumerService } from './consumers';
@Module({
  imports: [
    ClientsModule.register([
      { name: 'APP_CONSUMER', transport: Transport.TCP },
    ]),
    DataModule,
  ],
  providers: [AppConsumerService, CommandService],
})
export class AppConsumerModule {}
