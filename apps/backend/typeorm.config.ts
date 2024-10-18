import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dotenv = require('dotenv');
import { join } from 'path';
import { PlaySession } from '@app/data/entities/playSession.entity';
import { PlayingGroup } from '@app/data/entities/playingGroup.entity';
import { Buyin } from '@app/data/entities/buyin.entity';
import { Player } from '@app/data/entities/player.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  schema: 'weeklyscore',
  entities: [PlaySession, PlayingGroup, Buyin, Player],
  migrations: [join(__dirname, 'libs/data/src/migrations/*.ts')],
  synchronize: false,
  logging: true,
});
