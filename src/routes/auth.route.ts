import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { googleMiddleware } from '@/middlewares/google.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import AuthService from '@/services/auth.service';
import UserService from '@/services/users.service';
import SessionService from '@/services/session.service';
const passport = require("passport");

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.get(`${this.path}/google`, this.authController.google);
    this.router.get(`${this.path}/google/callback`, this.authController.googleCallBack);
    this.router.get(`${this.path}/login/success`, authMiddleware, this.authController.loginSuccess);


  }
}

export default AuthRoute;
