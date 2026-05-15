"use client";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { deleteTaskById } from "@/app/actions/actions";

export function DeleteTaskById({ id }: { id: number }) {

    const initialState = {
        message: "",
        status: false
    }

    const [state, dispatchAction, pending] = useActionState(deleteTaskById, initialState);

    return (
        <form action={dispatchAction}>
            <input
                type="hidden"
                name="id"
                value={id}
            />
            <Button type="submit"> Delete Task</Button>
        </form>
    )
}