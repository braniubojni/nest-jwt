import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersDto } from "./dto/users.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags('Users')
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Create the user" })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully created.",
    type: User,
  })
  @Post()
  create(@Body() userDto: UsersDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully found.",
    type: [User],
  })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
