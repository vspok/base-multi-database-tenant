import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import {  TenantEntity } from './tenant.entity';

@Entity({ name: 'ambient' })
export class AmbientEntity extends AbstractEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: string;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToMany(type => TenantEntity, tenant => tenant.ambients)
    tenants: TenantEntity[];
}
