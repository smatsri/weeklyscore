import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  constructor() {}

  async generateMockData() {
    console.log('generate mock data');
  }
}
