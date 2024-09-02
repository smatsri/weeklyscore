import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { postgraphile } from 'postgraphile';
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

@Injectable()
export class PostGraphileMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) { }


  use(req: any, res: any, next: () => void) {
    const dbHost = this.configService.get<string>('DB_HOST');
    const dbPort = this.configService.get<string>('DB_PORT');
    const dbUsername = this.configService.get<string>('DB_USERNAME');
    const dbPassword = this.configService.get<string>('DB_PASSWORD');
    const dbName = this.configService.get<string>('DB_DATABASE');

    const databaseUrl = `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

    postgraphile(databaseUrl, 'public', {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      enableCors: true, // If CORS is needed
      appendPlugins: [ConnectionFilterPlugin],
    })(req, res, next);
  }
}
