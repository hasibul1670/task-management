import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { ITaskStatus } from "../task.interface";

export class GetTaskFilterDTO {

    @IsOptional()
    @IsIn([ITaskStatus.OPEN, ITaskStatus.IN_PROGRESS, ITaskStatus.DONE])
    @IsNotEmpty()
    status?: ITaskStatus;

    @IsNotEmpty()
    @IsOptional()
    search?: string;
}