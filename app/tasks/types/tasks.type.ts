import { RowDataPacket } from "mysql2";

export interface TaskType extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: string

}

export interface OneTask {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: string
}

export interface UserType extends RowDataPacket {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}