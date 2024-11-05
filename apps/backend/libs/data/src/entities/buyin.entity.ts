import * as entities from '@app/domain/entities/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Player } from './player.entity';
import { PlaySession } from './playSession.entity';

@Entity({ schema: 'weeklyscore' })
export class Buyin implements entities.Buyin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => Player, (player) => player.buyins)
  @JoinColumn({ name: 'playerId' })
  @Index('idx_buyin_player_id')
  player: Player;

  @Column()
  playerId: string;

  @ManyToOne(() => PlaySession, (playSession) => playSession.buyins)
  @JoinColumn({ name: 'playSessionId' })
  @Index('idx_buyin_play_session_id')
  playSession: PlaySession;

  @Column()
  playSessionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
