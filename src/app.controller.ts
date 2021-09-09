import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { HttpService } from '@nestjs/axios';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users/dto/create-user.dto';

@ApiTags('accounts')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({summary: "Login with username and password (default password is 'admin' for all users, replace 'string' in username field with any username in /users)"})
  @ApiResponse({ status: 201, description: "Copy the JWT access token and paste in the Authorization button form in the top right corner of the page."})
  @ApiResponse({ status: 401, description: "Incorrect login information. The password is always 'admin'. The username can be: 'Bret', 'Antonette', 'Samantha', 'Karianne', 'Kamren', 'Leopoldo_Corkery', 'Elwyn.Skiles', 'Maxime_Nienow', 'Delphine', 'Moriah.Stanton'"})
  @ApiBody({ type: CreateUserDto})
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
