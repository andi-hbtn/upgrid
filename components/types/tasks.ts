import { RowDataPacket } from "mysql2";

export interface TaskType extends RowDataPacket {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
}

export interface UpdateTaskType {
    title: string;
    description: string;
    id: string;
}