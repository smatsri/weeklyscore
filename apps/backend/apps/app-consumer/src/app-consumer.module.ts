import { Module, OnModuleInit } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConsumerService } from './app-consumer.service';
import { CommandService } from './command';
import { DataModule } from '@app/data';
@Module({
  imports: [
    ClientsModule.register([
      { name: 'APP_CONSUMER', transport: Transport.TCP },
    ]),
    DataModule,
  ],
  providers: [AppConsumerService, CommandService],
})
export class AppConsumerModule implements OnModuleInit {
  constructor(private readonly appConsumerService: AppConsumerService) {}
  onModuleInit() {
    this.appConsumerService.start();
  }
}
