import { MessageModule } from './message/message.module';
import { Routes } from 'nest-router';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { RolesModule } from './roles/roles.module';
import { ThemeModule } from './theme/theme.module';
import { UsersModule } from './users/users.module';

export const routes: Routes = [
  {
    path: '/users',
    module: UsersModule,
    children: [
      {
        path: '/:user_id/questions',
        module: QuestionModule,
        children: [
          {
            path: '/:question_id/answers',
            module: AnswerModule,
          },
        ],
      },
      {
        path: '/:receiver_id/messages',
        module: MessageModule,
      },
    ],
  },
  {
    path: '/roles',
    module: RolesModule,
  },
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/themes',
    module: ThemeModule,
  },
];
