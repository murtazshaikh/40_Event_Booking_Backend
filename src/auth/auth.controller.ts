import { Body, Controller, Post, BadRequestException, UseGuards, Request, Get } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto'; // <-- Import this
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service'; // <-- Import this
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.usersService.createUser(email, password, role);
    return {
      message: 'User registered successfully',
      user: { email: user.email, role: user.role },
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
