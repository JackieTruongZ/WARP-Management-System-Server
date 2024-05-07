import BaseQuery from "@/base/base.query";
import { db } from "@/databases/db";
import { CreateUserDto, CreateUserDtoGoogleAuth } from "@/dtos/users.dto";
import { User } from "@/interfaces/users.interface";
import { hash } from "bcrypt";
import { Filter } from "mongodb";

class UserQuery extends BaseQuery<User, CreateUserDto> {
    protected collectionName: string = 'users';
    protected attributeBase: string = 'email';
    protected listAttribute: string[] = ['email', 'password'];


    public findByGoogleId = async (googleId: string) => {

        const query: Filter<User> = { googleId: googleId } as Filter<User>;
        const findData: Omit<User, '_id'> = await db.collection<User>(this.collectionName).findOne(query);

        return findData;
    }

    public saveUserGoogleAuth = async (createData: CreateUserDtoGoogleAuth): Promise<any> => {

        const saveData = await db.collection<any>(this.collectionName).insertOne(createData);

        return saveData;
    }
}


export default UserQuery; 