import { IsEmail, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly username: string;
}
