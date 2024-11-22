import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAuthService implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  onModuleInit() {
    const serviceAccountPath = this.configService.get<string>(
      'GOOGLE_APPLICATION_CREDENTIALS',
    );

    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, 'utf-8'),
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(token);
  }
}
