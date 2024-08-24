import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '@app/authentication';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from '@app/data';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgraphileModule } from '@app/postgraphile';
import { join } from 'path';
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
      //entities: [join(__dirname, 'libs/data/src/entities/*.entity{.ts,.js}')],
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      synchronize: false,
    }),
    DataModule,
    PostgraphileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
