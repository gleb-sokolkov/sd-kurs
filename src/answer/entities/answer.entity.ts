import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { ModelWithID } from 'src/models/models';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/users/entities/user.entity';

interface AnswerCreationAttrs {
  text: string;
}

@Table({ tableName: 'answer', timestamps: true })
export class Answer extends ModelWithID<Answer, AnswerCreationAttrs> {
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

  @BelongsTo(() => Question)
  question: Question;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  question_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;
}
