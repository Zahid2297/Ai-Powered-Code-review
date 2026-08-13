import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { GithubSignInForm } from "@/features/auth/components/github-sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your AI Code Reviewer with your Github account.",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { callbackUrl } = await searchParams;

  return (
    <Card size="sm" className="rounded-3xl border-border/70 shadow-md">
      <CardHeader className="items-center text-center">
        <div className="mb-3 flex justify-center pt-1">
          <Image
            src="/logo.png"
            alt="AI Code Reviewer Logo"
            width={40}
            height={37}
            className="size-10 object-contain"
            priority
          />
        </div>
        <CardTitle className="text-lg font-semibold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Sign in to your AI Code Reviewer with your Github account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <FieldSet>
          <FieldGroup>
            <Field>
              <GithubSignInForm callbackUrl={callbackUrl} />
              <FieldDescription className="text-center text-xs leading-relaxed text-muted-foreground">
                We only use your Github account to authenticate you. You can
                always sign out later.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
