import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from 'src/question/entities/question.entity';
import { ThemeQuestion } from './theme-question.entity';

interface ThemeCreationAttrs {
  name: string;
}

@Table({ tableName: 'theme', timestamps: false })
export class Theme extends Model<Theme, ThemeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  theme_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Question, () => ThemeQuestion)
  questions: Question[];
}
