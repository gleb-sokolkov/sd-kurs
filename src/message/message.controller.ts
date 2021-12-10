import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { findOne } from './dto/message.params';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Param() params: findOne, @Body() dto: CreateMessageDto) {
    return this.messageService.create(params, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Param() params: findOne) {
    return this.messageService.findAll(params);
  }

  @Get(':message_id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: findOne) {
    return this.messageService.findOne(params);
  }

  @Patch(':message_id')
  @HttpCode(HttpStatus.OK)
  update(@Param() params: findOne, @Body() dto: UpdateMessageDto) {
    return this.messageService.update(params, dto);
  }

  @Delete(':message_id')
  @HttpCode(HttpStatus.OK)
  remove(@Param() params: findOne) {
    return this.messageService.remove(params);
  }
}
