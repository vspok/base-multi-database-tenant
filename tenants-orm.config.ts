import { join } from 'path';
import { ormconfig } from './orm.config';
export const tenantsormconfig = {

    ...ormconfig,
    entities: [join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}')], migrations: [join(__dirname, './migrations/tenanted/*{.ts,.js}')],
};
