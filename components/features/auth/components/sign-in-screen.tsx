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
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { SignInFlow } from "../types";

type ISignInScreenProps = {
  onScreen: (e: SignInFlow) => void;
};
export const SignInScreen = ({ onScreen }: ISignInScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {};

  return (
    <Card className="h-full w-full p-8">
      <CardHeader className="px-0 pt-0 pb-2">
        <CardTitle>Login to continue</CardTitle>
      </CardHeader>
      <CardDescription className="pb-2">
        Use your email or another services
      </CardDescription>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            placeholder="Enter your email"
            type="email"
            required
          />

          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
            placeholder="Password"
            type="password"
            required
          />

          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Submit
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-2.5">
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center gap-2 justify-center"
            onClick={() => {}}
          >
            <FcGoogle />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full flex items-center gap-2 justify-center"
            onClick={() => {}}
          >
            <FaGithub />
            Continue with GitHub
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account ?
          <span
            className="hover:underline text-blue-600 font-semibold pl-1 cursor-pointer"
            onClick={() => onScreen('signUp')}
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
