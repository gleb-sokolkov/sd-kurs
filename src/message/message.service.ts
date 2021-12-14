import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { findOne } from './dto/message.params';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message) private messageRepo: typeof Message) {}

  async create(params: findOne, dto: CreateMessageDto) {
    try {
      const message = await this.messageRepo.create(
        Object.assign(dto, {
          receiver_id: params.receiver_id,
        }),
        {
          include: [
            { model: User, as: 'sender' },
            { model: User, as: 'receiver' },
          ],
        },
      );
      return message;
    } catch (ex) {
      throw new BadRequestException({
        message: `Failed to create message`,
        params,
        dto,
      });
    }
  }

  async findAll(params: findOne) {
    const { message_id, ...findAll } = params;
    const messages = await this.messageRepo.findAll({
      where: findAll,
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' },
      ],
    });
    if (messages.length === 0)
      throw new BadRequestException({
        message: 'There are no messages in the table',
        params,
      });
    return messages;
  }

  async findOne(params: findOne) {
    const message = await this.messageRepo.findOne({
      where: params,
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' },
      ],
    });
    if (!message)
      throw new BadRequestException({
        message: 'There is no such message in the table',
        params,
      });
    return message;
  }

  async update(params: findOne, dto: UpdateMessageDto) {
    await this.findOne(params);
    try {
      const result = await this.messageRepo.update(dto, {
        where: params,
        returning: true,
      });
      return result[1][0];
    } catch (ex) {
      throw new BadRequestException({
        message: 'Failed to update the message in the table',
        params,
        dto,
      });
    }
  }

  async remove(params: findOne) {
    const status = await this.messageRepo.destroy({ where: params });
    if (!status)
      throw new BadRequestException({
        message: 'Failed to destroy the message in the table',
        params,
      });
  }
}
