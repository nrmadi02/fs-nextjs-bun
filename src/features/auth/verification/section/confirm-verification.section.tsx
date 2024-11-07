"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfirmVerificationSection() {
  return (
    <div className="flex size-full min-h-[60vh] items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verification</CardTitle>
          <CardDescription>Please check your email for the verification link.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="submit" className="w-full">
            Resend verification
          </Button>
          <div className="mt-4 text-center text-sm">
            Have a other account?{" "}
            <Link href="/auth/login" className="font-bold underline">
              Login
            </Link>
          </div>
          <p className="mt-1 text-center text-sm">or</p>
          <div className="mt-1 text-center text-sm">
            <Link href="/auth/register" className="font-bold underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
