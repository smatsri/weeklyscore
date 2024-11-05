import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectRepository(Player)
    private readonly repo: Repository<Player>,
  ) {}

  async createPlayer(player: Partial<Player>): Promise<Player> {
    const newPlayer = this.repo.create(player);
    const res = await this.repo.save(newPlayer);
    return res;
  }
}
