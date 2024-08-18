import * as entities from '@app/domain/entities/types';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PlaySession } from './PlaySession';

@Entity()
export class PlayingGroup implements entities.PlayingGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PlaySession, playSession => playSession.playingGroup)
  playSessions: PlaySession[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
