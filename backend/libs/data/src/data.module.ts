import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Buyin } from './entities/buyin.entity';
import { PlaySession } from './entities/playSession.entity';
import { PlayingGroup } from './entities/playingGroup.entity';
import { DataService } from './data.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Buyin, PlaySession, PlayingGroup]),
  ],
  providers: [DataService],
  exports: [TypeOrmModule, DataService],
})
export class DataModule {}
