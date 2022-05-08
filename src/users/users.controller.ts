import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AddRoleDto } from "src/users/dto/add-role.dto";
import { BanUserDto } from "src/users/dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { RmRoleDto } from "./dto/rm-role.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags("Users")
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
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully found.",
    type: [User],
  })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Provide the role" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('add-role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: "Delete additional role" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('rm-role')
  rmRole(@Body() dto: RmRoleDto) {
    return this.usersService.rmRole(dto);
  }

  @ApiOperation({ summary: "Ban the user" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
