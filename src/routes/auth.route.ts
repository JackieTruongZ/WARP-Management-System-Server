import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { googleMiddleware } from '@/middlewares/google.middleware';
const passport = require("passport");

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.get(`${this.path}/login/success`, this.authController.loginSuccess);
    this.router.get(`${this.path}/google`, passport.authenticate("google", {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
        'https://www.googleapis.com/auth/user.addresses.read',
        'https://www.googleapis.com/auth/profile.agerange.read'
      ]
    }));
    // this.router.get(`${this.path}/google/callback`, googleMiddleware);
    this.router.get(`${this.path}/google/callback`, passport.authenticate('google', {
      successRedirect: "http://localhost:3000",
    }));
    this.router.get(`${this.path}/logout`, this.authController.googleLogout);

  }
}

export default AuthRoute;
