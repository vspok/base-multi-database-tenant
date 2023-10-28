import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AbstractEntity } from "../abstract.entity";

@Index("email", ["email"], { unique: true })
@Entity("user")
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "profile", length: 255, default: () => "'admin'" })
  profile: string;

  @Column("int", { name: "tokenVersion", default: () => "'0'" })
  tokenVersion: number;

  @Column({ name: "canReadMessage", default: () => "'1'" })
  canReadMessage: boolean;

  @Column("varchar", { name: "sla", length: 45, default: () => "'1'" })
  sla: string;

  @Column({ name: "master", nullable: true, default: () => "'0'" })
  master: boolean;

  // @BeforeUpdate
  // @BeforeCreate
  // static hashPassword = async (instance: User): Promise<void> => {
  //   if (instance.password) {
  //     instance.password = await hash(instance.password, 8);
  //   }
  // };

  // public checkPassword = async (password: string): Promise<boolean> => {
  //   return compare(password, this.getDataValue("password"));
  // };

}
