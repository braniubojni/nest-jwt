import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  banned: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  banReason: string;
}
