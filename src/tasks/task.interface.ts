
export enum ITaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface ITaskResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
