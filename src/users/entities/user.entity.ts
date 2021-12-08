import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { ModelWithID } from 'src/models/models';
import { Question } from 'src/question/entities/question.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserRole } from 'src/roles/entities/user-role.entity';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'user', timestamps: true })
export class User extends ModelWithID<User, UserCreationAttrs> {
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

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Question, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  questions: Question[];
}
