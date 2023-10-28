import { dirname, join } from "path";
import { SnakeNamingStrategy } from "src/infra/database/naming-strategy";

export const ormconfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'thomasvanderstraeten',
    password: 'root',
    database: 'nestjis-multi-tenant',
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
    autoLoadEntities: true,
    entities: [join( __dirname, './modules/public/**/*.entityí(.ts,.js)')],

    migrations: [join( __dirname, './migrations/public/*(.ts,.js)')],
}
