import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Buyin } from './entities/buyin.entity';
import { PlaySession } from './entities/playSession.entity';
import { PlayingGroup } from './entities/playingGroup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Buyin, PlaySession, PlayingGroup]),
  ],
  exports: [TypeOrmModule],
})
export class DataModule {}
