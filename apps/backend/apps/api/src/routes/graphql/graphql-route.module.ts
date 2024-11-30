import { PostgraphileModule } from "@app/postgraphile";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    PostgraphileModule,
  ],
  controllers: [],
  providers: []
})
export class GraphqlRouteModule { }