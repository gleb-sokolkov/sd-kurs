import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from 'src/question/entities/question.entity';
import { Theme } from './theme.entity';

@Table({ tableName: 'themeQuestion', timestamps: false })
export class ThemeQuestion extends Model<ThemeQuestion> {
  @ForeignKey(() => Theme)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  theme_id: number;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  question_id: number;
}
