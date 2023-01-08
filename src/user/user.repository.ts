import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async saveUser(user: UserEntity) {
    this.users.push(user);
  }

  async listUsers() {
    return this.users;
  }

  async doesUserEmailAlreadyExists(email: string) {
    const findedUserByEmail = this.users.find((user) => user.email === email);
    return findedUserByEmail !== undefined;
  }

  private findById(id: string) {
    const findedUser = this.users.find((user) => user.id === id);

    if (!findedUser) {
      throw new Error('User not found');
    }

    return findedUser;
  }

  async updateUser(id: string, requestData: Partial<UserEntity>) {
    const findedUser = this.findById(id);

    Object.entries(requestData).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      findedUser[chave] = valor;
    });

    return findedUser;
  }

  async deleteUser(id: string) {
    const findedUser = this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return findedUser;
  }
}
