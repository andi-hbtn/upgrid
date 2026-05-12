"use server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
export async function createTaskAction(prevState: { success: boolean; message: string }, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    try {
        await db.query("INSERT INTO tasks(title,description) VALUES (?, ?)", [title, description]);
        return {
            success: true,
            message: 'Task created successfully',
        }

    } catch (error) {
        console.log("Error creating task:", error);
        return {
            success: false,
            message: 'Failed to create task',
        }
    }
}


export async function updateTaskAction(prevState: any, formData: FormData) {
    try {
        const id = formData.get("id") as string;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        await db.query(
            "UPDATE tasks SET title=?, description=? WHERE id=?",
            [title, description, id]
        );
        
    } catch (error) {
        return {
            success: false,
            message: 'Failed to update task',
        }
    }
    redirect("/tasks");
}

// Ke 3 mënyra kryesore për të bërë create - task në Next.js:

// Server Actions(me ose pa useActionState)
// API Routes + fetch(client - side)
// API Routes + form submit klasik(pa JS / progressive enhancement)