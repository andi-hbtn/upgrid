"use server";
import * as Z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession, removeSession } from "@/lib/cookie";
import { UserType } from "../tasks/types/tasks.type";
import { UserRegisterSchema, UserLoginSchema } from "@/lib/auth.schema";

export async function RegisterUserAction(prevState: any, formData: FormData) {
    try {

        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const validateFields = UserRegisterSchema.safeParse({
            firstname,
            lastname,
            email,
            password
        });
        if (!validateFields.success) {
            return {
                status: false,
                errors: Z.prettifyError(validateFields.error)
            }
        }
        const [checkUserIfExist] = await db.query<UserType[]>("SELECT * from user WHERE email=?", [email]);

        if (checkUserIfExist.length > 0) {
            return {
                message: "User already registered",
                status: false
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [user] = await db.query("INSERT INTO user (firstname,lastname,email,password) VALUES(?,?,?,?)", [firstname, lastname, email, hashedPassword]);
        await createSession(user.insertId);
        return {
            status: true,
            message: "User registered successfully"
        };
    } catch (error) {
        console.log("checkUserIfExist--", error);
        return {
            message: error instanceof Error ? error.message : "Unexpected error",//sepse UI pret String dhe jo Object message
            status: false
        }
    }

}

export async function LogoutUserAction(prevState: any, formData: FormData) {
    try {
        await removeSession();
        return {
            status: true,
            message: "User logout successfully"
        };
    } catch (error) {
        return {
            status: false,
            message: error instanceof Error ? error.message : "Logout failed"
        };
    }
}

export async function LoginUserAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const validateFields = UserLoginSchema.safeParse({ email, password });
        if (!validateFields.success) {
            return {
                status: false,
                errors: Z.prettifyError(validateFields.error)
            }
        }

        const [user] = await db.query<UserType[]>("SELECT * from user WHERE email=?", [email]);
        if (user.length === 0) {
            return {
                message: "You are not registered already",
                status: false
            }
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return {
                status: false,
                message: "Invalid credentials"
            };
        }

        await createSession(String(user[0].id));

        return {
            status: true,
            message: "Login successful"
        };

    } catch (error) {
        return {
            status: false,
            message: error instanceof Error ? error.message : "Login failed"
        };
    }
}