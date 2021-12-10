import { routes } from './routes';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { UserRole } from './roles/entities/user-role.entity';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { ThemeModule } from './theme/theme.module';
import { Theme } from './theme/entities/theme.entity';
import { Question } from './question/entities/question.entity';
import { ThemeQuestion } from './theme/entities/theme-question.entity';
import { AnswerModule } from './answer/answer.module';
import { Answer } from './answer/entities/answer.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [
        User,
        Role,
        UserRole,
        Theme,
        Question,
        ThemeQuestion,
        Answer,
        Message,
      ],
      autoLoadModels: true,
      sync: { force: JSON.parse(process.env.POSTGRES_SYNCHRONIZE) },
    }),
    RouterModule.forRoutes(routes),
    UsersModule,
    RolesModule,
    AuthModule,
    QuestionModule,
    ThemeModule,
    AnswerModule,
    MessageModule,
  ],
})
export class AppModule {}
