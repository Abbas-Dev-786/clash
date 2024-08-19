import React from "react";
import Link from "next/link";
import Login from "@/components/auth/Login";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full md:w-[550px] shadow-md rounded-xl py-5 px-10 bg-white">
        <div>
          <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Clash <span className="text-black font-bold">Login</span>
          </h1>
        </div>
        <Login />
        <p className="text-center mt-4">
          {"Don't have an account? "}
          <strong>
            <Link href="/register">Register</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}
