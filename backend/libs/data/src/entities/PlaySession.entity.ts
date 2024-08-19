import * as entities from '@app/domain/entities/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { Buyin } from './buyin.entity';
import { PlayingGroup } from './playingGroup.entity';

@Entity()
export class PlaySession implements entities.PlaySession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Buyin, (buyin) => buyin.playSession)
  buyins: Buyin[];

  @ManyToOne(() => PlayingGroup, (playingGroup) => playingGroup.playSessions)
  @Index('idx_play_session_playing_group_id')
  playingGroup: PlayingGroup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
