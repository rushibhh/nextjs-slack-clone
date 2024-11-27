import { useAuthActions } from "@convex-dev/auth/react";
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { SignInFlow } from "../types";
import { TriangleAlert } from "lucide-react";
type ISignInScreenProps = {
    onScreen: (e: SignInFlow) => void;
};
export const SignInScreen = ({ onScreen }: ISignInScreenProps) => {
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState<boolean>(false);

    const onProviderHandle = (value: "github") => {
        setIsPending(true);
        signIn(value).finally(() => setIsPending(false));
    };

    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        signIn("password", { email, password, flow: "signIn" })
            .catch(() => {
              setError('Invalid email or password')
            })
            .finally(() => setIsPending(false));
    };

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0 pb-2">
                <CardTitle>Login to continue</CardTitle>
            </CardHeader>
            <CardDescription className="pb-2">
                Use your email or another services
            </CardDescription>
            {!!error && (
                <div className="bg-destructive/15 p-3 text-white w-full rounded-md flex items-center gap-x-2 text-sm text-destructive mb-4">
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignIn} className="space-y-2.5">
                    <Input
                        disabled={isPending}
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />

                    <Input
                        disabled={isPending}
                        value={password}
                        onChange={(e) => setPassword(e?.target?.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isPending}
                    >
                        Submit
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-2.5">
                    {/* <Button
                        variant="outline"
                        size="lg"
                        className="w-full flex items-center gap-2 justify-center"
                        onClick={() => onProviderHandle("google")}
                    >
                        <FcGoogle />
                        Continue with Google
                    </Button> */}
                    <Button
                        disabled={isPending}
                        variant="outline"
                        size="lg"
                        className="w-full flex items-center gap-2 justify-center"
                        onClick={() => onProviderHandle("github")}
                    >
                        <FaGithub />
                        Continue with GitHub
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account ?
                    <span
                        className="hover:underline text-blue-600 font-semibold pl-1 cursor-pointer"
                        onClick={() => onScreen("signUp")}
                    >
                        Sign Up
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};
