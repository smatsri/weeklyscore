import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommandService } from './command';
import { DataModule } from '@app/data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { HandlersModule } from './command/handlers/handlers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'APP_CONSUMER', transport: Transport.TCP },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      synchronize: false,
    }),
    HandlersModule,
  ],
  providers: [CommandService],
})
export class AppConsumerModule { }
