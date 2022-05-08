import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @IsString({ message: "Should be a string" })
  readonly title: string;

  @IsString({ message: "Should be a string" })
  readonly content: string;

  @IsNumber({}, { message: "Should be a number" })
  readonly userId: number;
}
