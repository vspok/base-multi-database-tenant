import { UserEntity } from "./tenanted/user.entity";
import { AmbientEntity } from "./tenants/ambient.entity";
import { TenantEntity } from "./tenants/tenant.entity";

export const TENANTS_ENTITIES = [
    AmbientEntity,
    TenantEntity
]
export const TENANTED_ENTITIES = [
    UserEntity
]
