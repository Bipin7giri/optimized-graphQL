import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";
@Entity()
export class Education extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    collegeName?: string;

    @Column({ nullable: true })
    courseName?: string;

    @Column({ nullable: true })
    level?: string;

    @OneToOne(() => User, (user: any) => user.education)
    @JoinColumn()
    user: User;
}