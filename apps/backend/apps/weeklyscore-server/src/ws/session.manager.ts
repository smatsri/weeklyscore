// session.manager.ts
import { Session } from './session.class';

export class SessionManager {
  private sessions: Map<string, Session> = new Map();

  addSession(clientId: string, session: Session) {
    if (this.sessions.has(clientId)) {
      this.removeSession(clientId);
    }
    this.sessions.set(clientId, session);
  }

  getSession(clientId: string): Session | undefined {
    return this.sessions.get(clientId);
  }

  removeSession(clientId: string) {
    const session = this.sessions.get(clientId);
    if (session) {
      session.cleanup();
    }
    this.sessions.delete(clientId);
  }

  cleanup() {
    this.sessions.forEach((session) => {
      session.cleanup();
    });
    this.sessions.clear();
  }
}
