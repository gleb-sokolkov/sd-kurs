import { Model } from 'sequelize';
import { Column, DataType } from 'sequelize-typescript';

export class ModelWithID<T, C> extends Model<T, C> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
}
