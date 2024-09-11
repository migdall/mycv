import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Hash the password

    // Create a new user and save it

    // Return the user
    console.log('signup');
  }

  signin() {
    console.log('signin');
  }

  signout() {
    console.log('signout');
  }
}
