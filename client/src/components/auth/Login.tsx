"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../common/SubmitBtn";
import Link from "next/link";

export default function Login() {
  return (
    <form>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input placeholder="Type your email" name="email" />
        {/* <span className="text-red-400">{state.errors?.email}</span> */}
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Type your password"
          name="password"
        />
        <div className="text-right underline mt-2">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        {/* <span className="text-red-400">{state.errors?.password}</span> */}
      </div>
      <div className="mt-5">
        <SubmitButton />
      </div>
    </form>
  );
}
