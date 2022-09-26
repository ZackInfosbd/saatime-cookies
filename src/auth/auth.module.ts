import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  jwtStrategy,
  JwtTwoFactorStrategy,
  RefreshTokenStrategy,
  LocalStrategy,
} from './strategies';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { EmailConfirmationModule } from '../emailConfirmation/emailConfirmation.module';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
    PassportModule,
    ConfigModule,
    EmailConfirmationModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    jwtStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    JwtTwoFactorStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
