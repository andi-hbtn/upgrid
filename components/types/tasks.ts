import { RowDataPacket } from "mysql2";

export interface TaskType extends RowDataPacket {
    id: string;
    title:string;
    description: string;
    createdAt: Date;
}