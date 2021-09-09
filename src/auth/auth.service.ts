import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Add fields in 'payload', jwt.strategy.ts > async validate, that already exist in the database to receive them as a response

  async login(user: any) {
    const payload = { id: user.id, name: user.name, username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

         