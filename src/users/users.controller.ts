import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const newUser = this.usersService.create(body.email, body.password);
    return newUser;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    const user = this.usersService.findOne(Number(id));
    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: PatchUserDto) {
    const updatedUser = await this.usersService.update(Number(id), body);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removeUser = await this.usersService.remove(Number(id));
    if (!removeUser) {
      throw new NotFoundException('User not found');
    }
    return removeUser;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
