export interface ITask {
    id: string;
    title: string;
    description: string;
    status: string;
}
export enum ITaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface ITaskResponse {
    success: boolean;
    message: string;
    data: ITask[];
}