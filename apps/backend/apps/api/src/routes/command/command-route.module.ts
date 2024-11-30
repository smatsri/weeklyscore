import { Module } from "@nestjs/common";
import { HandlersModule } from "./handlers/handlers.module";
import { CommandService } from "./command.service";
import { CommandController } from "./command.controller";

@Module({
  imports: [
    HandlersModule
  ],
  controllers: [
    CommandController
  ],
  providers: [
    CommandService
  ]
})
export class CommandRouteModule { }