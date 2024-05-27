import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
// import { EncryptedField } from '../../helpers/encrypted/encrypted.decorator';
import { AmbientEntity } from './ambient.entity';
import { EncryptionTransformer } from 'typeorm-encrypted';
import { EncryptedColumn } from '../../helpers/encrypted/encrypted.decorator';

const EncryptionEntity = new EncryptionTransformer({
    key: process.env.CRIPT_KEY,
    algorithm: 'aes-256-cbc',
    ivLength: 16,
    iv: process.env.CRIPT_IV,
});
@Entity({ name: 'tenants' })
export class TenantEntity extends AbstractEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: string;

    @Column()
    name: string;

    @Column()
    version: string;

    @EncryptedColumn()
    // @EncryptedField()
    host: string;

    @Column()
    // @EncryptedField()
    port: number;

    @EncryptedColumn()
    // @EncryptedField()
    username: string;

    @EncryptedColumn()
    // @EncryptedField()
    password: string;

    @EncryptedColumn()
    // @EncryptedField()
    database: string;

    @ManyToMany((type) => AmbientEntity, (ambient) => ambient.tenants)
    ambients: AmbientEntity[];
}
