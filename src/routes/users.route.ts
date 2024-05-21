import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.get);
    this.router.get(`${this.path}/:id`, this.usersController.getById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.create);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateUserDto, 'body', true), this.usersController.update);
    this.router.delete(`${this.path}/:id`, this.usersController.delete);
    this.router.get(`${this.path}/infor/:id`, this.usersController.getInforById);
  }
}

export default UsersRoute;
