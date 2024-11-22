import { Module } from '@nestjs/common';
import { Handler } from './handler';
import { DataModule } from '@app/data';
import { AddBuyinHandler } from './add-buyin.handler';
import { AddPlayerHandler } from './add-player.handler';
import { CreateSessionHandler } from './create-session.handler';

@Module({
  imports: [DataModule],
  providers: [Handler, AddBuyinHandler, AddPlayerHandler, CreateSessionHandler],
  exports: [Handler],
})
export class HandlersModule {}
