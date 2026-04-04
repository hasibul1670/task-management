import { Body, Controller, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask, ITaskResponse, ITaskStatus } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { } // dependency injection by constructor

    @Get() //get decorator
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDTO): ITask[] {
        console.log(filterDto);
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilter(filterDto);
        }
        return this.taskService.getAllTasks();
    }


    @Get("/:id")
    getSingleTask(@Param("id") id: string): ITaskResponse<ITask | undefined> {
        return this.taskService.getSingleTask(id);
    }

    @Patch("/update/:id")
    updateTaskStatus(
        @Param("id") id: string,
        @Body("status") status: ITaskStatus): ITaskResponse<ITask[]> {
        return this.taskService.updateTaskStatus(id, status);
    }

    @Post("/delete/:id")
    deleteTask(@Param("id") id: string): ITaskResponse<ITask[]> {
        return this.taskService.deleteTask(id);
    }

    @Post("create")
    createTask(@Body() createTaskDto: CreateTaskDto): ITaskResponse<ITask[]> {
        return this.taskService.createTask(createTaskDto);
    }
}
