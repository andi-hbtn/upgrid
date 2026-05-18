import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function RegisterUserAction(prevState: any, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        await db.query("");

    } catch (error) {
        return {
            message: "unable to register",
            status: false
        }
    }
    redirect("/");
}