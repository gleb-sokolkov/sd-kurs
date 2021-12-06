import { ModelWithID } from './../../models/models';
import { Column, DataType, Table } from 'sequelize-typescript';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'role', timestamps: false })
export class Role extends ModelWithID<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;
}
