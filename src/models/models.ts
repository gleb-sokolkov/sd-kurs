import { Model } from 'sequelize-typescript';
import { Column, DataType } from 'sequelize-typescript';

export class ModelWithID<T, C> extends Model<T, C> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
}
