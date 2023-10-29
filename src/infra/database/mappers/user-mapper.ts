import { UserModel } from "src/domain/models/tenanted/user";
import { UserEntity } from "../entities/tenanted/user.entity";

export class UserMapper{

    static toDatabase(user: UserModel):UserEntity{
        const userEntity: UserEntity = new UserEntity();

        userEntity.id = user.id;
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.profile = user.profile;
        userEntity.canReadMessage = user.canReadMessage;
        userEntity.sla = user.sla;
        userEntity.master = user.master;
        // userEntity.queues = user.queues;
        userEntity.password = user.password;
        userEntity.created_at = user.created_at;
        return userEntity;
    }

    static toDomain(userEntity: UserEntity): UserModel {
        const user: UserModel = new UserModel();

        user.id = userEntity.id;
        user.name = userEntity.name;
        user.email = userEntity.email;
        user.profile = userEntity.profile;
        user.canReadMessage = userEntity.canReadMessage;
        user.sla = userEntity.sla;
        user.master = userEntity.master;
        user.password = userEntity.password;
        // user.queues = userEntity.queues;
        user.created_at = userEntity.created_at;
        user.updated_at = userEntity.updated_at;
        user.deleted_at = userEntity.deleted_at;

        return user;
    }
}
