import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidation implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const doesUserEmailAlreadyExists =
      await this.userRepository.doesUserEmailAlreadyExists(value);
    return !doesUserEmailAlreadyExists;
  }
}

export const IsUniqueEmail = (validationOptions: ValidationOptions) => {
  return (object: object, propriedade: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propriedade,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidation,
    });
  };
};
