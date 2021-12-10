import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { ModelWithID } from 'src/models/models';
import { User } from 'src/users/entities/user.entity';

interface MessageCreationAttrs {
  text: string;
}

@Table({ tableName: 'message', timestamps: true })
export class Message extends ModelWithID<Message, MessageCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @BelongsTo(() => User, 'sender_id')
  sender: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sender_id: number;

  @BelongsTo(() => User, 'receiver_id')
  receiver: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  receiver_id: number;
}
