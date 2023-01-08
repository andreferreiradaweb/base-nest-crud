import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';
import { IsUniqueEmail } from '../validation/unique-email.validation';
export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsUniqueEmail({ message: 'Já existe um usuário com este e-mail' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @IsNotEmpty()
  @IsOptional()
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  password: string;
}
