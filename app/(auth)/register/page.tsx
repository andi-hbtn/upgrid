"use client"
import { useActionState } from "react";
import { RegisterUserAction } from "@/app/actions/auth.actions";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
    const initialState = {
        message: "",
        status: false
    }

    const [state, dispatchAction, pending] = useActionState(RegisterUserAction, initialState);

    console.log("pending----", pending);
    console.log("state----", state);

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create account</CardTitle>
                    <CardDescription>
                        Register to start using your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={dispatchAction} className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="firstname">Firstname</Label>
                            <Input id="firstname" name="firstname" placeholder="John Doe" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastname">Lastname</Label>
                            <Input id="lastname" name="lastname" placeholder="John Doe" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>

                        <Button className="w-full" disabled={state?.status}>
                            {pending ? "Creating account..." : "Register"}
                        </Button>


                        <p className="text-sm text-center text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}