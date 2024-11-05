import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Buyin } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class BuyinRepository {
  constructor(
    @InjectRepository(Buyin)
    private readonly repo: Repository<Buyin>,
  ) {}

  async createBuyin(buyin: Partial<Buyin>): Promise<Buyin> {
    return this.repo.save(buyin);
  }
}
