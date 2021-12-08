import { findOne as userFindOne } from 'src/users/dto/user.params';

export class findOne extends userFindOne {
  question_id: number;
}
