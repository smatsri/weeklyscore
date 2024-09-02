import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { PlaySession } from './entities/playSession.entity';
import { Buyin } from './entities/buyin.entity';
import { getSessions, shuffle } from './mock/utils';
import { PlayingGroup } from './entities/playingGroup.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(PlaySession)
    private sessionRepository: Repository<PlaySession>,
    @InjectRepository(Buyin)
    private buyinRepository: Repository<Buyin>,
    @InjectRepository(PlayingGroup)
    private playingGroup: Repository<PlayingGroup>,


  ) { }

  async generateMockData() {
    console.log('generate mock data');
    const playingGroup = await this.playingGroup.findOneBy({ id: "93e7041f-926c-4cc6-a588-c616d6a027f7" })
    const players = await this.playerRepository.find();

    const sessions = getSessions(2021, 2024);

    for (const sessionData of sessions) {
      shuffle(players);
      const session = this.sessionRepository.create({
        createdAt: sessionData.startDate,
        playingGroup
      });

      await this.sessionRepository.save(session);

      const buyings = sessionData.buyins.map((playerBuyinsData, i) => {
        const player = players[i];
        return playerBuyinsData.map((buyinData) => {
          return this.buyinRepository.create({
            amount: buyinData.amount,
            player,
            playSession: session,
            createdAt: buyinData.date
          })
        })
      }).flat()



      await this.buyinRepository.save(buyings);

    }

    return { sessions };
  }
}
