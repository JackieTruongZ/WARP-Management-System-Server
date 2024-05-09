import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';

const passport = require("passport");

class AuthController {

  public authService = new AuthService();

  googleLogout(req: any, res: Response, next: NextFunction) {
    req.logout((err: any) => {
      if (err) {
        return next(err);
      }
      res.redirect("http://localhost:3000/");
    });
  }

  async googleCallBack(req: Request, res: Response, next: NextFunction) {

    return res.redirect("http://localhost:3000");

  }

  google(req: Request, res: Response, next: NextFunction) {
    const profileScope: string = "https://www.googleapis.com/auth/userinfo.profile"
    const emailScope: string = "https://www.googleapis.com/auth/userinfo.email"
    const numberphoneScope: string = "https://www.googleapis.com/auth/user.phonenumbers.read"

    passport.authenticate("google", {
      scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/user.phonenumbers.read',
        'https://www.googleapis.com/auth/user.addresses.read',
        'https://www.googleapis.com/auth/profile.agerange.read']
    })(req, res, next);
  }

  loginSuccess(req: RequestWithUser, res: Response, next: NextFunction) {
    // console.log('user : ', req.user);

    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: req.user,
      });
    } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  }

  // public signUp = async (req: Request, res: Response, next: NextFunction) => {
  //   // const {db} = req.app.db;
  //   try {
  //     const userData: CreateUserDto = req.body;
  //     const signUpUserData: User = await this.authService.signup(userData);

  //     res.status(201).json({ data: signUpUserData, message: 'signup' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public logIn = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userData: CreateUserDto = req.body;
  //     const { cookie, findUser } = await this.authService.login(userData);

  //     res.setHeader('Set-Cookie', [cookie]);
  //     res.status(200).json({ data: findUser, message: 'login' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  //   try {
  //     const userData: User = req.user;
  //     const logOutUserData: User = await this.authService.logout(userData);

  //     res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
  //     res.status(200).json({ data: logOutUserData, message: 'logout' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

}

export default AuthController;
