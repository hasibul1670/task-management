import { Entity, Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ITaskResponse, ITaskStatus } from "./task.interface";

@Entity()
export class TaskRepository extends Repository<Task> {
    
  public async createTask(createTaskDto: CreateTaskDto): Promise<ITaskResponse<Task>>{
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = ITaskStatus.OPEN;
        await task.save();
        return {
            success: true,
            message: "Task created successfully.",
            data: task
        }
    }
}