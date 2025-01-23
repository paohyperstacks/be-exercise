import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class Onboarding {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    accountNumber: string;

    @Column()
    name: string;

    @Column()
    mobile: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({nullable: true})
    hashedRefreshToken: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }


}