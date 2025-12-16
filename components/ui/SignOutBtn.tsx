"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {

  return (
    <div className="w-full max-w-md rounded-2xl border bg-primary">
      <button
        onClick={() => signOut()}
        aria-label="Log out"
        className="flex gap-3 p-3 cursor-pointer text-white font-semibold"
      >
        <LogOutIcon className="w-6 h-6" />
        <p>Sign Out</p>
      </button>
    </div>
  
  );
};

export default SignOutButton;
