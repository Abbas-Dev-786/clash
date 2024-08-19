import Register from "@/components/auth/Register";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full px-10 md:w-[550px] shadow-md rounded-xl py-5 bg-white">
        <div>
          <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Clash <span className="text-black font-bold">Register</span>
          </h1>
        </div>
        <Register />
        <p className="text-center mt-3">
          Already have an account ?{" "}
          <strong>
            <Link href="/login">Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}
