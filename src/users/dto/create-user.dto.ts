import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "user@mail.ru", description: "Email" })
  @IsString({ message: "Email always should be string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;

  @ApiProperty({ example: "Abcd1234", description: "Password" })
  @IsString({ message: "Password should be string" })
  @Length(8, 40, { message: "Lower than 40 more than 8" })
  readonly password: string;
}
