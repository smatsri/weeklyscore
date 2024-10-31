import { Module, OnModuleInit } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConsumerService } from './app-consumer.service';
@Module({
  imports: [
    ClientsModule.register([
      { name: 'APP_CONSUMER', transport: Transport.TCP },
    ]),
  ],
  controllers: [],
  providers: [AppConsumerService],
})
export class AppConsumerModule implements OnModuleInit {
  constructor(private readonly appConsumerService: AppConsumerService) {}
  onModuleInit() {
    this.appConsumerService.start();
  }
}
