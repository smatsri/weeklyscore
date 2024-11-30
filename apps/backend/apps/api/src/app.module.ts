import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '@app/authentication';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthenticationModule,
    createTypeOrmModule(),
    RoutesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }


function createTypeOrmModule() {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: ['src/migrations/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    synchronize: false,
  });
}

