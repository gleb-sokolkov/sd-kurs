import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from './user-role.entity';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'role', timestamps: false })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  value: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
