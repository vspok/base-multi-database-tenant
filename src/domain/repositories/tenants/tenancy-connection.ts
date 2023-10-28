import { IArrayResponse } from "src/helpers/intefaces/array-response-interface";
import { UserModel } from "../../models/tenanted/user";
import { IFilterOptions } from "src/helpers/intefaces/filter-options";
import { IDataSource } from "src/helpers/class/data-source.interface";
import { TenantModel } from "../../models/tenants/tenant";
export interface FilterUser extends IFilterOptions<Partial<UserModel>, {'pageNumber': string, 'limit': string, 'searchParam': string}>{};
export abstract class ITenancyConnection {
    abstract tenancy:IDataSource;
    abstract tenanciesConnections:{
        name: TenantModel['name'],
        dataSource: IDataSource
    }[] ;

    abstract getTenancyConnectionByName(name:TenantModel['name']):Promise<IDataSource>;
    abstract getNameTenantByUrl(url):Promise<TenantModel['name']>;
    abstract getConnectionDefault():Promise<IDataSource>;
    protected abstract createConnectionsTenancies(): Promise<void>;
    protected abstract createConnectionDefault():Promise<void>;
    // protected abstract createConnectionTenancy():Promise<void>;
}
