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
import { LoginDto } from '@app/auth/dto/login.dto';
import { JwtRefreshPayload } from '@app/common/types/jwt-refresh-payload.type';
import { RefreshGuard } from '@app/auth/guards/refresh.guard';
import { GoogleGuard } from '@app/auth/guards/google.guard';
import { TransformInterceptor } from '@app/common/interceptors/transform.interceptor';

@UseInterceptors(TransformInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
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
}
