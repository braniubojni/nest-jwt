import { ApiProperty } from "@nestjs/swagger";

export class UsersDto {

    @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
    readonly email: string;

    @ApiProperty({ example: 'Abcd1234', description: 'Password' })
    readonly password: string;
}
