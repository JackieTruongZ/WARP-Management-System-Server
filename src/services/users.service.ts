import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import BaseService from '@/base/base.service';
import UserQuery from '@/query/users.query';
import { Profile } from 'passport-google-oauth20';
import RequestInforService from './requestInfor.service';
import { RequestInforSystemWithoutId } from '@/interfaces/request.interface';

class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {

  protected collectionName: string = 'users';
  protected nameBase: string = 'User';
  protected nameInfor: string = 'userInfor';
  protected attributeBase: string = 'email';
  protected listAttribute: string[] = ['email', 'password'];


  protected query: UserQuery;
  private requestInfoService: RequestInforService;

  constructor() {
    super();
    this.query = new UserQuery();
    this.requestInfoService = new RequestInforService();
  }

  public findAndUpdateUser = async (profile: any) => {
    const findUser = await this.query.findByGoogleId(profile.id);
    if (findUser) {
      return findUser;
    }
    else {
      const createUser: CreateUserDto = {
        googleId: profile.id || ' ',
        email: profile.email || ' ',
        name: profile.name || ' ',
        givenName: profile.given_name || ' ',
        familyName: profile.family_name || ' ',
        verified_email: profile.verified_email || ' ',
        avatar: profile.picture || ' ',
        locale: profile.locale || ' ',
        role: '',
        gender: '',
        date: undefined,
        numberPhone: '',
        address: '',
        citizenIdentityCard: '',
        bankInfor: {
          name: '',
          bankName: '',
          bankId: '',
          bankNumber: ''
        },
        accessable: {
          _id: true,
          name: true,
          email: true,
          givenName: true,
          familyName: true,
          verified_email: false,
          avatar: true,
          locale: true,
          role: true,
          gender: true,
          date: true,
          numberPhone: true,
          address: true,
          googleId: false,
          citizenIdentityCard: false,
          bankInfor: false
        }
      }

      const saveUser = await this.query.saveData(createUser);

      const findUser = await this.query.findByGoogleId(profile.id);

      return findUser;
    }
  }

  public update = async (dataId: string, updateData: UpdateUserDto): Promise<any> => {


    const updatedData = await super.update(dataId, updateData);

    const requestData: RequestInforSystemWithoutId = {
      source: 'Update Service',
      type: 'update-info',
      title: 'update-info',
      content: 'update-info',
      receiverId: [dataId]
    }

    await this.requestInfoService.createRequest('system', 'update-info', requestData);

    return updatedData;

  };

}

export default UserService;
