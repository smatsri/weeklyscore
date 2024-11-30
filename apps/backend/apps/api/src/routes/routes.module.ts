import { Module } from "@nestjs/common";
import { GraphqlRouteModule } from "./graphql/graphql-route.module";
import { CommandRouteModule } from "./command";

@Module({
  imports: [
    GraphqlRouteModule,
    CommandRouteModule
  ],
  controllers: [],
  providers: []
})
export class RoutesModule { }