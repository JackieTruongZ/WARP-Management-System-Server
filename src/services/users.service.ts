import { CreateUserDto, CreateUserDtoGoogleAuth } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import BaseService from '@/base/base.service';
import UserQuery from '@/query/users.query';
import { Profile } from 'passport-google-oauth20';

class UserService extends BaseService<User, CreateUserDto> {

  protected collectionName: string = 'users';
  protected nameBase: string = 'User';
  protected attributeBase: string = 'email';
  protected listAttribute: string[] = ['email', 'password'];


  protected query: UserQuery;

  constructor() {
    super();
    this.query = new UserQuery();
  }

  public passportLoginHandle = async (profile: Profile, done: (error: any, user?: any) => void) => {
    const findUser = await this.query.findByGoogleId(profile.id);
    if (findUser) {
      console.log("user found : ", findUser);

      done(null, findUser);
    }
    else {
      const createUser: CreateUserDtoGoogleAuth = {
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile._json.name,
        givenName: profile._json.given_name,
        familyName: profile._json.family_name,
        emailVerified: profile._json.email_verified,
        avatar: profile._json.picture,
        locale: profile._json.locale
      }

      const saveUser = await this.query.saveUserGoogleAuth(createUser);

      const findUser = await this.query.findByGoogleId(profile.id);

      console.log("user found : ", findUser);
      done(null, findUser);

    }
  }

}

export default UserService;
