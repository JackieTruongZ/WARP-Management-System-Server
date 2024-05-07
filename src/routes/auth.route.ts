import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { googleMiddleware } from '@/middlewares/google.middleware';


class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.get(`${this.path}/login/success`, this.authController.loginSuccess);
    this.router.get(`${this.path}/google`, this.authController.google);
    this.router.get(`${this.path}/google/callback`, googleMiddleware, this.authController.googleCallBack);
    this.router.get(`${this.path}/logout`, this.authController.googleLogout);

  }
}

export default AuthRoute;
