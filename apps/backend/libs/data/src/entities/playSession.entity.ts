import * as entities from '@app/domain/entities/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Buyin } from './buyin.entity';
import { PlayingGroup } from './playingGroup.entity';

@Entity({ schema: 'weeklyscore' })
export class PlaySession implements entities.PlaySession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  score: number;

  @OneToMany(() => Buyin, (buyin) => buyin.playSession)
  buyins: Buyin[];

  @ManyToOne(() => PlayingGroup, (playingGroup) => playingGroup.playSessions)
  @JoinColumn({ name: 'playingGroupId' })
  @Index('idx_play_session_playing_group_id')
  playingGroup: PlayingGroup;

  @Column()
  playingGroupId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
