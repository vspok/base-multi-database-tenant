import { SnakeNamingStrategy } from "src/infra/database/naming-strategy";
import { DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'
import { booleanString } from "src/helpers/string-to-boolean";

dotenv.config({ path: process.env.NODE_ENV == "production" ? ".env.production" : ".env" })

export const configTenancyDefault:DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'generic_table',
    entities: [__dirname + 'src/infra/database/entities/tenants/*{.ts,.js}'],
    synchronize: booleanString(process.env.BD_SINCROZAR),
    logging: booleanString(process.env.BD_LOGGING),
    timezone: 'Z',
    charset: 'utf8mb4',
    namingStrategy: new SnakeNamingStrategy(),
}


export const configDefault: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'generic_table',
    entities: [__dirname + 'src/infra/database/typeorm/entities/tenanted/*{.ts,.js}'],
    synchronize: booleanString(process.env.BD_SINCROZAR),
    logging: booleanString(process.env.BD_LOGGING),
    namingStrategy: new SnakeNamingStrategy(),
    timezone: 'Z',
    charset: 'utf8mb4',
};
