import { Injectable } from '@nestjs/common';
import { ITask, ITaskResponse, ITaskStatus } from './task.interface';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class TasksService {
    private tasks: ITask[] = [];

    getAllTasks(): ITask[] {
        return this.tasks;
    }

    createTask(title: string, description: string):ITask {
        const task:ITask = {
            id: uuidv4(),
            title,
            description,
            status: ITaskStatus.OPEN,
        }
        this.tasks.push(task);
        return task
    }
}
