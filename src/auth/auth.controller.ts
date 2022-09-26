import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  UseGuards,
  Req,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { RequestWithUser } from '../common/interfaces';
import { JwtAuthGuard, JwtRefreshGuard, localGuard } from '../common/guards';
import { EmailConfirmationService } from '../emailConfirmation/emailConfirmation.service';

@Controller('api/v1/auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  // Sign up handler
  @Post('sign-up')
  @HttpCode(201)
  async signup(@Body() signupData: RegisterDto) {
    const user = await this.authService.signup(signupData);
    await this.emailConfirmationService.sendVerificationLink(signupData.email);
    return user;
  }

  // Sign in handler
  @HttpCode(200)
  @UseGuards(localGuard)
  @Post('sign-in')
  async signin(@Req() request: RequestWithUser) {
    const { user } = request;

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );

    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    // if (user.isTwoFactorAuthenticationEnabled) return;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  @HttpCode(200)
  async signOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
