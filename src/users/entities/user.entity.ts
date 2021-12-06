import { Column, DataType, Table } from 'sequelize-typescript';
import { ModelWithID } from 'src/models/models';

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
}
