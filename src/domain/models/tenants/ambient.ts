import { AbstractModel } from "../abstract";
import { TenantModel } from "./tenant";

export class AmbientModel extends AbstractModel {
    id: string;
    name: string;
    url: string;
    tenants: TenantModel[];
}
