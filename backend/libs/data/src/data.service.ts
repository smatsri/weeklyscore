import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async generateMockData() {
    const players = await this.playerRepository.find();
    console.debug(players);
    console.log('generate mock data');
  }
}
