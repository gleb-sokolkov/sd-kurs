import { Model } from 'sequelize-typescript';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Role } from './role.entity';

@Table({ tableName: 'userRole', timestamps: false })
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  user_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  role_value: string;
}
