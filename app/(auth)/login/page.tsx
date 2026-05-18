import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <Card className="w-full max-w-md rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome back
                    </CardTitle>
                    <p className="text-sm text-center text-black/60">
                        Login to continue managing your tasks
                    </p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <form>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="you@example.com" />
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input type="password" placeholder="••••••••" />
                        </div>

                        <Button className="w-full" type="submit">Login</Button>
                    </form>

                    <p className="text-sm text-center text-black/60">
                        Don’t have an account?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}