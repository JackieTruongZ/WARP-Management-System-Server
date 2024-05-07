import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class CreateUserDtoGoogleAuth {
  @IsEmail()
  public email: string;

  @IsString()
  public googleId: string;

  @IsString()
  public name: string;

  @IsString()
  public givenName: string;

  @IsString()
  public familyName: string;

  @IsString()
  public emailVerified: string;

  @IsString()
  public avatar: string;

  @IsString()
  public locale: string;
}