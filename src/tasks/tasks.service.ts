import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ITaskStatus } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import type { ITask, ITaskResponse } from './task.interface';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {
    private tasks: ITask[] = [];

    getAllTasks(): ITask[] {
        return this.tasks;
    }
    getSingleTask(id: string): ITaskResponse<ITask | undefined> {
        const singleTask = this.tasks.find(task => task.id === id);
        if (!singleTask) {
            return {
                success: false,
                message: "Task not found."
            }
        }
        return {
            success: true,
            message: "Task found successfully.",
            data: singleTask
        }
    }
    deleteTask(id: string): ITaskResponse<ITask[]> {
        this.tasks = this.tasks.filter(task => task.id !== id);
        if (this.tasks.length === 0) {
            return {
                success: false,
                message: "Task not found."
            }
        }
        return {
            success: true,
            message: "Task deleted successfully.",
            data: this.tasks
        }
    }
    updateTaskStatus(id: string, status: ITaskStatus): ITaskResponse<ITask[]> {
        const task = this.getSingleTask(id).data;
        if (!task) {
            return {
                success: false,
                message: "Task not found."
            }
        }
        task.status = status;
        return {
            success: true,
            message: "Task updated successfully.",
            data: this.tasks
        }
    }

    createTask(createTaskDto: CreateTaskDto): ITaskResponse<ITask[]> {
        const { title, description } = createTaskDto;
        const taskPayload: ITask = {
            id: uuidv4(),
            title,
            description,
            status: ITaskStatus.OPEN,
        }
        this.tasks.push(taskPayload);
        return {
            success: true,
            message: "Task created successfully.",
            data: this.tasks
        }
    }

    getTaskWithFilter(getTaskFilterDTO: GetTaskFilterDTO): ITask[] {
        const { status, search } = getTaskFilterDTO;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }
}
