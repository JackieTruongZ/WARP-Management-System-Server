import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import UserService from '@services/users.service';
import baseController from '@/base/base.controller';

class UsersController extends baseController<User, CreateUserDto> {
  protected service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }
  
}

export default UsersController;
