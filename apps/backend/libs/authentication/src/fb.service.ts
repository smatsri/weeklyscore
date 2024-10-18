import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAuthService implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  onModuleInit() {
    const relativePath = this.configService.get<string>(
      'GOOGLE_APPLICATION_CREDENTIALS',
    );
    const serviceAccountPath = path.resolve(__dirname, relativePath);
    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, 'utf-8'),
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async verifyToken(token: string) {
    return admin.auth().verifyIdToken(token);
  }
}
