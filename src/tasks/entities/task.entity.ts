import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ITaskStatus } from "../task.interface";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    title!: string;

    @Column({ type: 'text' })
    description!: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({
        type: 'enum',
        enum: ITaskStatus,
        default: ITaskStatus.OPEN,
    })
    status!: ITaskStatus;
}
