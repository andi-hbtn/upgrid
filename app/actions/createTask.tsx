"use server";
import { db } from "@/lib/db";
export default async function createTaskAction(prevState: { success: boolean; message: string }, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    try {
        const result = await db.query("INSERT INTO tasks(title,description) VALUES (?, ?)", [title, description]);
        return {
            success: true,
            message: 'Task created successfully',
        }

    } catch (error) {
        return {
            success: false,
            message: 'Failed to create task',
        }
    }
}