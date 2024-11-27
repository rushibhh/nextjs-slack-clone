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
import { useAuthActions } from "@convex-dev/auth/react";

type ISignUpScreenProps = {
    onScreen: (e: SignInFlow) => void;
};
export const SignUpScreen = ({ onScreen }: ISignUpScreenProps) => {
    const { signIn } = useAuthActions();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const onProviderSignUp = (value: "github") => {
        setPending(true);
        signIn(value).finally(() => setPending(false));
    };

    const onPasswordSingUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Password do not match");
            return;
        }
        setPending(true);
        signIn("password", {
            name,
            email,
            password,
            flow: "signUp",
        })
            .catch(() => {
                setError("Something went wrong");
            })
            .finally(() => {
                setPending(false);
            });
    };

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0 pb-2">
                <CardTitle>Sign up to continue</CardTitle>
            </CardHeader>
            <CardDescription className="pb-2">
                Use your email or another services
            </CardDescription>
            {!!error && (
                <div className="bg-destructive/15 rounded-md p-3 flex items-center gap-x-3 text-sm mb-4">
                    <TriangleAlert className="size-4" />
                    <p className="text-destructive">{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSingUp} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        type="text"
                        required
                    />

                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />

                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />

                    <Input
                        disabled={pending}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Conform password"
                        type="password"
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={pending}
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
                        onClick={() => onProviderSignUp('google')}
                    >
                        <FcGoogle />
                        Continue with Google
                    </Button> */}
                    <Button
                        disabled={pending}
                        variant="outline"
                        size="lg"
                        className="w-full flex items-center gap-2 justify-center"
                        onClick={() => onProviderSignUp("github")}
                    >
                        <FaGithub />
                        Continue with GitHub
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Already have an account ?
                    <span
                        className="hover:underline text-blue-600 font-semibold pl-1 cursor-pointer"
                        onClick={() => onScreen("signIn")}
                    >
                        Sign In
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};
