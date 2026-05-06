'use client'
import { useActionState } from 'react';

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import createTaskAction from "@/app/actions/createTask";

export default function CreateTodo() {
    const initialState = {
        success: false,
        message: '',
    }

    const [state, formAction, pending] = useActionState(
        createTaskAction,
        initialState
    );

    return (
        <div className="flex items-center justify-center py-10">
            <Card className="w-full max-w-lg shadow-lg rounded-2xl">

                <CardHeader>
                    <CardTitle>Create New Task</CardTitle>
                    <CardDescription>
                        Add a title and description for your task
                    </CardDescription>
                </CardHeader>

                <form action={formAction}>
                    <CardContent className="space-y-4">

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input
                                placeholder="e.g. Build Navbar UI"
                                name="title"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                placeholder="Write task details..."
                                name="description"
                                rows={4}
                            />
                        </div>

                    </CardContent>

                    <CardFooter>
                        <Button className="w-full" type="submit">
                            Create Task
                        </Button>
                    </CardFooter>

                </form>
            </Card>
        </div>
    );
}