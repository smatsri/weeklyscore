import { Body, Controller, Post } from "@nestjs/common";
import { CommandService } from "./command.service";
import { Command } from "@weeklyscore/schema";
import { isSuccess } from "../../utils/result";

@Controller()
export class CommandController {

  constructor(
    private readonly commandService: CommandService
  ) { }

  @Post()
  async handleCommand(@Body() command: Command) {

    const result = await this.commandService.handle(command);

    if (isSuccess(result)) {
      return result.value;

    }
    return { success: false };
  }

}
