import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { ListUsersDTO } from './dto/ListUsers.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/usuarios')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UserEntity();
    userEntity.email = userData.email;
    userEntity.name = userData.name;
    userEntity.password = userData.password;
    userEntity.id = uuid();

    this.userRepository.saveUser(userEntity);
    return {
      user: new ListUsersDTO(userEntity.id, userEntity.name, userEntity.email),
      message: 'User created successfuly',
    };
  }

  @Get()
  async getUsers() {
    const savedUsers = await this.userRepository.listUsers();
    const usersList = savedUsers.map(
      (user) => new ListUsersDTO(user.id, user.name, user.email),
    );
    return usersList;
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() requestData: UpdateUserDTO,
  ) {
    const updatedUser = await this.userRepository.updateUser(id, requestData);

    return {
      user: updatedUser,
      message: 'User updated successfuly',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userRepository.deleteUser(id);
    return {
      user: deletedUser,
      message: 'User deleted successfuly',
    };
  }
}
