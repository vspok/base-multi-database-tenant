import { UserModel } from "src/domain/models/tenanted/user";
import { UserEntity } from "../entities/user.entity";

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
        userEntity.queues = user.queues;
        userEntity.password = user.password;
        userEntity.createdAt = user.createdAt;
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
        user.queues = userEntity.queues;
        user.createdAt = userEntity.createdAt;
        user.updatedAt = userEntity.updatedAt;

        return user;
    }
}
