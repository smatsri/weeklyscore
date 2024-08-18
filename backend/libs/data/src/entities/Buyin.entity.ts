import * as entities from '@app/domain/entities/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Player } from './Player.entity';
import { PlaySession } from './PlaySession.entity';

@Entity()
export class Buyin implements entities.Buyin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => Player, (player) => player.buyins)
  player: Player;

  @ManyToOne(() => PlaySession, (playSession) => playSession.buyins)
  playSession: PlaySession;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
