import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { EventsListenerController } from './event-listener.controller';
import { PublishService } from './publish.service';

@Module({
  imports: [CommonModule],
  providers: [EventsListenerController, PublishService],
  exports: [EventsListenerController],
})
export class PublisherModule {}
