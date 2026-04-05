
import { Injectable, NotFoundException } from '@nestjs/common';
import { ITaskStatus, type ITaskResponse } from './task.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    // getAllTasks(): ITask[] {
    //     return this.tasks;
    // }
    async getSingleTask(id: number): Promise<ITaskResponse<Task>>{
        const singleTask = await this.taskRepository.findOne({
            where: { id },
        });

        if (!singleTask) {
            throw new NotFoundException(`Task with Id "${id}" not found.`);
        }

        return {
            success: true,
            message: "Task found successfully.",
            data: singleTask
        }
    }
    // deleteTask(id: string): ITaskResponse<ITask[]> {
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    //     if (this.tasks.length === 0) {
    //         return {
    //             success: false,
    //             message: "Task not found."
    //         }
    //     }
    //     return {
    //         success: true,
    //         message: "Task deleted successfully.",
    //         data: this.tasks
    //     }
    // }
    // updateTaskStatus(id: string, status: ITaskStatus): ITaskResponse<ITask[]> {
    //     const task = this.getSingleTask(id).data;
    //     if (!task) {
    //         return {
    //             success: false,
    //             message: "Task not found."
    //         }
    //     }
    //     task.status = status;
    //     return {
    //         success: true,
    //         message: "Task updated successfully.",
    //         data: this.tasks
    //     }
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<ITaskResponse<Task>>{
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

    // getTaskWithFilter(getTaskFilterDTO: GetTaskFilterDTO): ITask[] {
    //     const { status, search } = getTaskFilterDTO;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    //     }
    //     return tasks;
    // }
}
