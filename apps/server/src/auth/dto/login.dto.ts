import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { PickType } from '@nestjs/mapped-types';

export class LoginSuccessDto {
  @Expose()
  accessToken: string;

  @Expose()
  expiresIn: string;
}

export class AccountLoginDto {
  @IsString()
  account: string;

  @IsString()
  password: string;
}

export class EmailLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(4)
  code: string;
}

export class SendEmailLoginCodeDto extends PickType(EmailLoginDto, ['email']) {}
