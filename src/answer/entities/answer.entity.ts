import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/users/entities/user.entity';

interface AnswerCreationAttrs {
  text: string;
  question_id: number;
  user_id: number;
}

@Table({ tableName: 'answer', timestamps: true })
export class Answer extends Model<Answer, AnswerCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  answer_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  solution: boolean;

  @BelongsTo(() => Question, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  question: Question;

  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER, allowNull: false })
  question_id: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;
}
