import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    create(@Body() userDto: UsersDto) {
        return this.usersService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }
}
