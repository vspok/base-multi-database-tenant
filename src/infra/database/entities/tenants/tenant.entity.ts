import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import { EncryptedField } from '../../helpers/encrypted/encrypted.decorator';
import { AmbientEntity } from './ambient.entity';

@Entity({ name: 'tenants' })
export class TenantEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    version: string;

    @Column()
    @EncryptedField()
    host: string;

    @Column()
    // @EncryptedField()
    port: number;

    @Column()
    @EncryptedField()
    username: string;

    @Column()
    @EncryptedField()
    password: string;

    @Column()
    @EncryptedField()
    database: string;

    @ManyToMany(type => AmbientEntity, ambient => ambient.tenants)
    ambients: AmbientEntity[];

}
