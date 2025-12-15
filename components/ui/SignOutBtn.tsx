"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {

  return (
    <button
          onClick={() => signOut()}
          aria-label="Log out"
          className="text-red-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <LogOutIcon className="w-6 h-6" />
        </button>
  );
};

export default SignOutButton;
