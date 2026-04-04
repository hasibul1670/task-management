import { Entity, EntityRepository, Repository } from "typeorm";
import { ITask } from "./task.interface";

@Entity()
export class TaskRepository extends Repository<ITask> {
    
}