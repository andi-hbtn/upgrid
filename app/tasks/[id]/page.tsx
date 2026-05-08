"use server";
import { db } from "@/lib/db";
import { useActionState } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TaskType } from "@/components/types/tasks";
import { updateTaskAction } from "@/app/actions/tasks.actions";

export default async function TaskPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const [rows] = await db.query<TaskType[]>(`SELECT * FROM tasks WHERE id=?`, [id]);
    const task = rows[0];

    const initialState = {
        success: false,
        message: '',
    }

    const [state, formAction, pending] = useActionState()

    return (
        <div className="min-h-screen bg-background py-10 px-4">

            <div className="max-w-2xl mx-auto">
                {/* Top */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Update Task </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Edit your task information
                        </p>
                    </div>
                    <Link href="/tasks">
                        <Button variant="outline">Back </Button>
                    </Link>
                </div>

                <Card className="rounded-2xl shadow-sm border">
                    <CardContent className="p-6">
                        <form className="space-y-6" action={formAction}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium"> Title </label>
                                <Input placeholder="Enter task title" defaultValue={task.title} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium"> Description</label>
                                <Textarea
                                    rows={6}
                                    placeholder="Write task description..."
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}