import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class PatchUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  password: string;
}
