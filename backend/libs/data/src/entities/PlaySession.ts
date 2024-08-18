import * as entities from '@app/domain/entities/types';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Buyin } from './Buyin';
import { PlayingGroup } from './PlayingGroup';

@Entity()
export class PlaySession implements entities.PlaySession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Buyin, buyin => buyin.playSession)
  buyins: Buyin[];

  @ManyToOne(() => PlayingGroup, playingGroup => playingGroup.playSessions)
  playingGroup: PlayingGroup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
