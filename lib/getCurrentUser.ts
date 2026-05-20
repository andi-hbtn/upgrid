import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { db } from "@/lib/db";
import { UserType } from "@/app/tasks/types/tasks.type";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) return null;

    const data = await decrypt(session);
    console.log("data----", data);

    const [rows] = await db.query<UserType[]>("SELECT id, firstname, lastname, email FROM user WHERE id=?", [data.userId]);
    return rows[0];
}