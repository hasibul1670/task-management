import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask, ITaskResponse } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { } // dependency injection by constructor
    
    @Get() //get decorator
    getAllTasks(): ITask[] {  // method
        return this.taskService.getAllTasks();
    }

    @Post("create")
    createTask(createTaskDto: CreateTaskDto): ITaskResponse {
            return this.taskService.createTask(createTaskDto);
    }
}
