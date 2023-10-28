import { IArrayResponse } from "src/helpers/intefaces/array-response-interface";
import { UserModel } from "../../models/tenanted/user";
import { IFilterOptions } from "src/helpers/intefaces/filter-options";
export interface FilterUser extends IFilterOptions<Partial<UserModel>, {'pageNumber': string, 'limit': string, 'searchParam': string}>{};
export abstract class UserRepository {
    abstract create(user: UserModel):Promise<UserModel>;
    abstract update(userId: number, User: Partial<UserModel>):Promise<UserModel>;
    abstract delete(userId: number):Promise<void>;
    abstract findById(userId: number):Promise<UserModel | null>;
    abstract findOne(filter: Partial<UserModel>):Promise<UserModel | null>;
    abstract findMany(filter: any):Promise<IArrayResponse<{ users: UserModel[] }>>;
    abstract findAll():Promise<UserModel[]>;
}
