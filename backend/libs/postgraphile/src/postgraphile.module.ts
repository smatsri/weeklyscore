import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PostGraphileMiddleware } from './postgraphile.middleware';

@Module({})
export class PostgraphileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PostGraphileMiddleware).forRoutes('/graphql');
  }
}
