import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '@app/authentication';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from '@app/data';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthenticationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      migrations: ['src/migrations/*.ts'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
