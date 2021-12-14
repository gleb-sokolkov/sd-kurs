import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/answer/entities/answer.entity';
import { ThemeQuestion } from 'src/theme/entities/theme-question.entity';
import { Theme } from 'src/theme/entities/theme.entity';
import { User } from 'src/users/entities/user.entity';

interface QuestionCreationAttrs {
  name: string;
  text: string;
  user_id: number;
}

@Table({ tableName: 'question', timestamps: true })
export class Question extends Model<Question, QuestionCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  question_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  text: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsToMany(() => Theme, () => ThemeQuestion)
  themes: Theme[];

  @HasMany(() => Answer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  answers: Answer[];
}
