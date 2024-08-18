import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './fb.service';
import { FirebaseAuthGuard } from './fb.guard';

@Module({
  providers: [FirebaseAuthService, FirebaseAuthGuard],
  exports: [FirebaseAuthService, FirebaseAuthGuard],
})
export class AuthenticationModule {}
