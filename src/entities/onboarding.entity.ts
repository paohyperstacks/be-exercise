import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Onboarding {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    mobile: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    email: string;
}