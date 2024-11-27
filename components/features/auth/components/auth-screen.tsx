"use client";
import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInScreen } from "./sign-in-screen";
import { SignUpScreen } from "./sign-up-screen";

export const AuthScreen = () => {
    const [screen, useScreen] = useState<SignInFlow>("signIn");
    return (
        <div className="bg-[#5C3B58] h-screen flex justify-center items-center">
            <div className="h-auto md:w-[400px]">
                {screen === "signIn" ? (
                    <SignInScreen onScreen={useScreen} />
                ) : (
                    <SignUpScreen onScreen={useScreen} />
                )}
            </div>
        </div>
    );
};
