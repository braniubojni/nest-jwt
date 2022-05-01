import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UsersDto } from "./dto/users.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepo: typeof User) {}

  async createUser(dto: UsersDto) {
    const user = await this.userRepo.create(dto);
    return user;
  }

  async getAllUsers(dto: UsersDto) {
      const users = await this.userRepo.findAll();
      return users;
  }
}
