import { Injectable } from '@nestjs/common';
import type { ITask, ITaskResponse } from './task.interface';
import { ITaskStatus } from './task.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {
    private tasks: ITask[] = [];

    getAllTasks(): ITask[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): ITaskResponse {
        const {title, description} = createTaskDto;
        const task:ITask = {
            id: uuidv4(),
            title,
            description,
            status: ITaskStatus.OPEN,
        }
        this.tasks.push(task);
        return {
            success: true,
            message: "Task created successfully.",
            data: this.tasks
        }
    }
}
