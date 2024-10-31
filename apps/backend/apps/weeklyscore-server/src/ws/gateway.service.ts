import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Session } from './session.class';
import { RedisService } from './redis.service';
import { FirebaseAuthService } from '@app/authentication';
import { Redis } from 'ioredis';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WSGateway implements OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;
  redis: Redis;
  constructor(private readonly auth: FirebaseAuthService) {}

  afterInit(server: any) {
    this.redis = new Redis('redis://localhost:6379');
  }

  private sessions: Map<string, Session> = new Map();

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const userId = await this.extractUserId(client);
    if (userId) {
      const redis = new RedisService(this.redis);
      const session = new Session(userId, client, redis);
      this.sessions.set(client.id, session);
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const session = this.sessions.get(client.id);
    if (session) {
      await session.cleanup();
      this.sessions.delete(client.id);
    }
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
