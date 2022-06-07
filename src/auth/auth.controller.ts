import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { Public } from '@app/common/decorators/public.decorator';
import {
  LoginWithEmailDto,
  LoginWithUsernameDto,
} from '@app/auth/dto/login.dto';
import { JwtRefreshPayload } from '@app/common/types/jwt-refresh-payload.type';
import { RefreshGuard } from '@app/auth/guards/refresh.guard';
import { GoogleGuard } from '@app/auth/guards/google.guard';
import { TransformInterceptor } from '@app/common/interceptors/transform.interceptor';
import { FacebookGuard } from '@app/auth/guards/facebook.guard';

@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('local/login/email')
  login(@Body() loginDto: LoginWithEmailDto) {
    return this.authService.loginWithEmail(loginDto);
  }

  @Public()
  @Post('local/login/username')
  loginWithUsername(@Body() loginDto: LoginWithUsernameDto) {
    return this.authService.loginWithUsername(loginDto);
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Get('refresh')
  refreshToken(@CurrentUser() user: JwtRefreshPayload) {
    return this.authService.refreshToken(user.email, user.refreshToken);
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }

  /*
    Google authentication
   */
  @Public()
  @UseGuards(GoogleGuard)
  @Get('google')
  async googleAuth() {
    console.log('Login with google');
  }

  @Public()
  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req) {
    return this.authService.googleUser(req.user);
  }

  /*
    Facebook authentication
   */
  @Public()
  @UseGuards(FacebookGuard)
  @Get('facebook')
  async facebookAuth() {
    console.log('Login with facebook');
  }

  @Public()
  @UseGuards(FacebookGuard)
  @Get('facebook/callback')
  async facebookAuthCallback(@Req() req) {
    return this.authService.facebookUser(req.user);
  }
}
