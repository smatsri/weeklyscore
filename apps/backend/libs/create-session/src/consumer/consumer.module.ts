import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { CommandListenerController } from './command-listener.controller';

@Module({
  imports: [CommonModule],
  providers: [CommandListenerController],
  exports: [CommandListenerController],
})
export class ConsumerModule {}
