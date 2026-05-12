"use server";
import { db } from "@/lib/db";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TaskType } from "@/components/types/tasks";
import UpdateTaskPage from "../update/page";
export default async function TaskPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const [rows] = await db.query<TaskType[]>(`SELECT * FROM tasks WHERE id=?`, [id]);
    const task = rows[0];

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
                        <UpdateTaskPage task={task} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}