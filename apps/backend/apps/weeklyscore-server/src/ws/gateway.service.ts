import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Session } from './services/session.class';
import { RedisService } from './services/redis.service';
import { FirebaseAuthService } from '@app/authentication';
import { Redis } from 'ioredis';
import { Sessions } from './services/session.manager';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WSGateway implements OnGatewayDisconnect, OnGatewayInit {
  sessionManager: Sessions = new Sessions();

  @WebSocketServer()
  server: Server;
  redis: Redis;
  constructor(private readonly auth: FirebaseAuthService) {}

  afterInit() {
    this.redis = new Redis('redis://localhost:6379');
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const userId = await this.extractUserId(client);
    if (userId) {
      const redis = new RedisService(this.redis);
      const session = new Session(userId, client, redis);
      await session.init();
      this.sessionManager.addSession(client.id, session);
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.sessionManager.removeSession(client.id);
  }

  private async extractUserId(client: Socket) {
    const token = client.handshake.auth.token;
    if (token) {
      try {
        const payload = await this.auth.verifyToken(token);
        return payload.sub;
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
    return null;
  }
}
