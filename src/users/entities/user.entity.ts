import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/answer/entities/answer.entity';
import { Message } from 'src/message/entities/message.entity';
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

  @HasMany(() => Answer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  answers: Answer[];

  @HasMany(() => Message, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'receiver_id',
  })
  received_messages: Message[];

  @HasMany(() => Message, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'sender_id',
  })
  sended_messages: Message[];
}
