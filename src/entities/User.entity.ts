import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Education } from "./Education.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    name?: string

    @Column({ nullable: true })
    address?: string

    @Column({ nullable: true })
    age?: number
    
    @OneToOne(() => Education, (education: any) => education.user)
    education: User;

}