import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ITaskResponse, ITaskStatus } from "./task.interface";

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<ITaskResponse<Task>> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: ITaskStatus.OPEN,
        });

        const savedTask = await this.save(task);

        return {
            success: true,
            message: "Task created successfully.",
            data: savedTask
        };
    }
}
