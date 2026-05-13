"use client";
import { OneTask } from "../types/tasks.type";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { updateTaskAction } from "@/app/actions/actions";

export default function UpdateTaskById({ task }: { task: OneTask }) {

    const initialState = {
        message: "",
        status: ""
    }

    const [state, dispatchAction, pending] = useActionState(updateTaskAction, initialState)

    return (
        <form className="space-y-6" action={dispatchAction}>
            <input
                type="hidden"
                name="id"
                value={task.id}
            />
            <div className="space-y-2">
                <label className="text-sm font-medium"> Title </label>
                <Input placeholder="Enter task title" name="title" defaultValue={task.title} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium"> Description</label>
                <Textarea
                    rows={6}
                    placeholder="Write task description..."
                    name="description"
                    defaultValue={task.description}
                />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
                <Link href="/tasks">
                    <Button type="button" variant="outline"> Cancel </Button>
                </Link>
                <Button type="submit"> Update Task</Button>
            </div>
        </form>
    )
}