import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from './redis.service';
import { Session } from './session.class';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WSGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private sessions: Map<string, Session> = new Map();

  constructor(private readonly redisService: RedisService) {}

  handleConnection(client: Socket) {
    const userId = this.extractUserId(client);
    if (userId) {
      const session = new Session(userId, client, this.redisService);
      this.sessions.set(userId, session);
      client.join(userId);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.extractUserId(client);
    if (userId) {
      const session = this.sessions.get(userId);
      if (session) {
        session.cleanup();
        this.sessions.delete(userId);
      }
      client.leave(userId);
      console.log(`Client disconnected: ${client.id}`);
    }
  }

  private extractUserId(client: Socket): string {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, 'YOUR_SECRET_KEY') as any;
        return payload.sub;
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
    return null;
  }
}
