import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepo.create(dto);
      const role = await this.roleService.getRoleByValue("USER");
      await user.$set("roles", [role.id]);
      user.roles = [role]
      return user;
    } catch (error) {
      Logger.error(error.message, "Err here");
    }
  }

  async getAllUsers() {
    const users = await this.userRepo.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
    console.log(user, 'USER')
    return user;
  }
}
