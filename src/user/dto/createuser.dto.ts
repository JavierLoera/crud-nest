import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

enum UserRole {
  ADMIN = 'ADMIN',
  MIEMBRO = 'MIEMBRO',
}
export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole, {
    message: 'El rol debe ser ADMIN o MIEMBRO',
  })
  role: string;
}
