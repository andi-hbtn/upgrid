"use client";
import { useActionState } from "react";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createTaskAction } from "@/app/actions/actions";

export default function CreateTask() {

    const initialState = {
        message: "",
        status: false
    }

    const [status, dispatchAction, pending] = useActionState(createTaskAction, initialState)

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-xl rounded-2xl shadow-sm border">
                <CardContent className="p-6">
                    <form className="space-y-6" action={dispatchAction}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input placeholder="Enter task title" name="title" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                rows={6}
                                placeholder="Write task description..."
                                name="description"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Link href="/tasks">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>

                            <Button type="submit">Create Task</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
