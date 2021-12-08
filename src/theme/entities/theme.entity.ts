import { BelongsToMany, Column, DataType, Table } from 'sequelize-typescript';
import { ModelWithID } from 'src/models/models';
import { Question } from 'src/question/entities/question.entity';
import { ThemeQuestion } from './theme-question.entity';

interface ThemeCreationAttrs {
  name: string;
}

@Table({ tableName: 'theme', timestamps: false })
export class Theme extends ModelWithID<Theme, ThemeCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Question, () => ThemeQuestion)
  questions: Question[];
}
