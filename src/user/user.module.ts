import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UniqueEmailValidation } from './validation/unique-email.validation';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UniqueEmailValidation],
})
export class UserModule {}
