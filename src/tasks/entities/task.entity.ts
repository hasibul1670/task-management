import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: string;
}