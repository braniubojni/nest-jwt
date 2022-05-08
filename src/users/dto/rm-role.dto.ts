import { IsNumber, IsString } from "class-validator";

export class RmRoleDto {
  @IsNumber({}, { message: "Should be a number" })
  readonly userId: number;

  @IsString({ message: "Should be a string" })
  readonly role: string;
}
