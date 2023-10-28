import { AbstractModel } from "../abstract";

export class TenantModel extends AbstractModel {
    id: string;
    name: string;
    version: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    // ambients: AmbientModel[];
}
