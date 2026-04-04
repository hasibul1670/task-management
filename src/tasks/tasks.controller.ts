import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.interface';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { } // dependency injection by constructor
    
    @Get() //get decorator
    getAllTasks(): ITask[] {  // method
        return this.taskService.getAllTasks();
    }

    @Post("create")
    createTask(
        @Body('title') title: string,
        @Body('description') description: string
    ): void {
        this.taskService.createTask(title, description);
        
    }
}
