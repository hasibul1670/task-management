import { Entity, Repository } from "typeorm";
import { Task } from "./entities/task.entity";

@Entity()
export class TaskRepository extends Repository<Task> {
    
}