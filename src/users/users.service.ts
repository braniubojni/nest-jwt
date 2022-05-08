import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AddRoleDto } from "src/users/dto/add-role.dto";
import { BanUserDto } from "src/users/dto/ban-user.dto";
import { RolesService } from "src/roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { RmRoleDto } from "./dto/rm-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    console.log('Should not come here');
    const user = await this.userRepo.create(dto);
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
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
    console.log(user, "USER");
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepo.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("User or Role was not found", HttpStatus.NOT_FOUND);
  }

  async rmRole(dto: RmRoleDto) {
    const user = await this.userRepo.findOne({
      where: { id: dto.userId },
      include: { all: true },
    });
    const role = await this.roleService.getRoleByValue(dto.role);

    if (user.roles.length < 2) {
      throw new HttpException(
        "Have only one role, can't delete",
        HttpStatus.NOT_ACCEPTABLE
      );
    }
    if (role && user) {
      await user.$remove("role", role.id);
      return dto;
    }
    throw new HttpException("User or Role was not found", HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepo.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("The user was not found", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
