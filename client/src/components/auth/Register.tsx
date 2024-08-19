"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../common/SubmitBtn";
import { Button } from "../ui/button";

export default function Register() {
  return (
    <form>
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input placeholder="Type your name" name="name" />
        {/* <span className="text-red-400">{state.errors?.name}</span> */}
      </div>
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
        {/* <span className="text-red-400">{state.errors?.password}</span> */}
      </div>
      <div className="mt-4">
        <Label htmlFor="cpassword">Confirm Password</Label>
        <Input
          type="password"
          placeholder="Type your password"
          name="confirm_password"
        />
        {/* <span className="text-red-400">{state.errors?.confirm_password}</span> */}
      </div>
      <div className="mt-6">
        <Button className="w-full">Register</Button>
      </div>
    </form>
  );
}
