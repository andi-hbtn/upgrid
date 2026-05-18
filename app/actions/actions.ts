"use server";
import { db } from "@/lib/db"
import { redirect } from "next/navigation";

export async function createTaskAction(prevState: any, formData: FormData){

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
        await db.query("INSERT into tasks(title,description) VALUES(?,?)", [title, description])
    } catch (error) {
        return {
            message: "Unable to update the task by id",
            status: false
        }
    }
    redirect("/tasks");
}

export async function updateTaskAction(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
        await db.query("UPDATE tasks set title=?, description=? WHERE id=?", [title, description, id]);
        // return {
        //     message: "The task was successfully updated",
        //     status: true
        // }
    } catch (error) {
        return {
            message: "Unable to update the task by id",
            status: false
        }
    }
    redirect("/tasks");
}

export async function deleteTaskById(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    try {
        await db.query("DELETE FROM tasks WHERE id=?", [id]);
    } catch (error) {
        return {
            message: "Unable to update the task by id",
            status: false
        }
    }

    redirect("/tasks");
}