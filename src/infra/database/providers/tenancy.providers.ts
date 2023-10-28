import { Scope } from "@nestjs/common";
import { TenantEntity } from "../entities/tenants/tenant.entity";
import { REQUEST } from "@nestjs/core";
import { ITenancyConnection } from "src/domain/repositories/tenants/tenancy-connection";
import { Request } from "express";
import { IDataSource } from "src/helpers/class/data-source.interface";

export const tenantFactoryFromRequest = {
    provide: "TENANCY_CONNECTION",
    scope: Scope.REQUEST,

    useFactory: async (req: Request, tenantService: ITenancyConnection) => {
      const tenant: IDataSource = await tenantService.getTenancyConnectionByName(
        req.headers.host.split(".")[0]
      );

      return tenant;
    },
    inject: [REQUEST, ITenancyConnection],
  };
