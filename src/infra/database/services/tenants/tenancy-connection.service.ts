import { configTenancyDefault, configDefault } from '../../../../../ormconfig';
import { Injectable } from '@nestjs/common';

import { TenantEntity } from '../../entities/tenants/tenant.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { IDataSource } from 'src/helpers/class/data-source.interface';
import { ITenancyConnection } from 'src/domain/repositories/tenants/tenancy-connection';

@Injectable()
export class TenancyConnection extends ITenancyConnection {
    constructor() {
        super();

        this.createConnectionDefault();
    }

    tenancy: IDataSource;
    tenanciesConnections: {
        name: TenantEntity['name'];
        dataSource: IDataSource;
    }[] = [];

    async createConnectionsTenancies(): Promise<void> {
        const connectionDefault = await this.getConnectionDefault();

        connectionDefault.getRepository(TenantEntity)
            .find({
                where: {
                    // version: "V1"
                }

            })
            .then(async (tenants) => {
                for (let index = 0; index < tenants.length; index++) {
                    const tenancy = tenants[index];

                    const myDataSource = new IDataSource({
                        ...configDefault,
                        ...tenancy,
                    } as MysqlConnectionOptions);
                    await myDataSource.initialize();

                    this.tenanciesConnections.push({
                        name: tenancy.name,
                        dataSource: myDataSource,
                    });
                }
            });
    }

    async getTenancyConnectionByName(name: TenantEntity['name']): Promise<IDataSource> {
        return this.tenanciesConnections.find((tenancy) => tenancy.name === name).dataSource;
    }

    async getNameTenantByUrl(url): Promise<TenantEntity['name']> {
        return await this.tenancy
            .getRepository(TenantEntity)
            .findOne({
                select: {
                    name: true,
                },
                where: {
                    ambients: {
                        url: url,
                    },
                },
            })
            .then((tenant) => tenant.name);
    }


    async getConnectionDefault(): Promise<IDataSource> {

        if(!this.tenancy.isInitialized) {
            await this.createConnectionDefault();
        }

        return this.tenancy;
    }

    async createConnectionDefault(): Promise<void> {
        this.tenancy = new IDataSource({
            ...configTenancyDefault,
        });

        await this.tenancy.initialize()
        .catch(async (error) => {
            console.log('ERRO MYSQL',error)

            if(error.code.includes('ER_BAD_DB_ERROR')) {
                let { database, ...configsDatabase } = configTenancyDefault;
                let db = new IDataSource({
                    ...configsDatabase,
                } as MysqlConnectionOptions );
                console.log('CRIANDO DATABASE')

                await db.initialize();
                await db.query(`CREATE DATABASE IF NOT EXISTS ${database}`).then(async () => {
                    console.log(' DATABASE CRIADA')
                    await db.destroy();
                    this.createConnectionDefault();
                }).catch((error) => {
                    db.destroy();

                    console.log(' DATABASE não Criada', error)
                })
                //aqui eu quero criar a database

            }
        });
    }
}
