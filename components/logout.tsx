"use client";

import { useActionState } from "react";
import { LogoutUserAction } from "@/app/actions/auth.actions";
import { useRouter } from "next/navigation";

const initialState = {
    status: false,
    message: ""
};

export default function LogoutButton() {
    const router = useRouter();

    const [state, dispatchaction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            const res = await LogoutUserAction();

            if (res.status) {
                router.push("/login");
                router.refresh();
            }

            return res;
        },
        initialState
    );

    return (
        <form action={action}>
            <button
                type="submit"
                disabled={isPending}
                className="w-full text-left"
            >
                {isPending ? "Logging out..." : "Logout"}
            </button>
        </form>
    );
}