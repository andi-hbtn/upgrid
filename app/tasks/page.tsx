import Link from "next/link";
import { TaskType } from "./types/tasks.type";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteTaskById } from "@/components/delete-taks";

export default async function TasksPage() {
    const [tasks] = await db.query<TaskType[]>(`SELECT * FROM tasks`);
    return (
        <div className="container mx-auto px-4 py-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Tasks</h1>
                    <p className="text-sm text-black/60">
                        Manage and track your tasks
                    </p>
                </div>

                <Link href="/tasks/create">
                    <Button>Create Task</Button>
                </Link>
            </div>

            {/* Tasks List */}
            {tasks.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task, index) => (
                        <Card
                            key={index}
                            className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer">
                            <CardContent className="p-5 space-y-2">
                                <h2 className="text-lg font-semibold">{task.title}</h2>
                                <p className="text-sm text-black/60 line-clamp-2">
                                    {task.description}
                                </p>
                                <div className="flex items-center gap-3 pt-2">
                                    <DeleteTaskById id={task.id} />
                                    <Link
                                        href={`/tasks/${task.id}`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        View details →
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="text-xl font-semibold">No tasks yet</h2>
                    <p className="text-sm text-black/60 mt-2">
                        Start by creating your first task
                    </p>

                    <Link href="/tasks/create" className="mt-6">
                        <Button>Create your first task</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}