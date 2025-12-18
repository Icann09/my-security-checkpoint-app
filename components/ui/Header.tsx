"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";





export default function Header ()  {
  const pathname = usePathname();



  return (
<header className="
  flex w-full h-[75px] mx-auto my-6 px-6
  justify-between items-center
  bg-gradient-to-r from-white via-white to-primary border-primary border-2
">

      {/* Logo */}
      <Link href="/" className="flex flex-col justify-center gap-1 pt-1">
        <Image
          src="/PLN_Nusantara_Power.png"
          alt="PLN Nusantara Power logo"
          width={160}
          height={80}
          priority
          className="h-auto w-auto max-h-12 object-contain"
        />
        <h2 className="text-sm font-semibold text-primary">SENTRAL PLTD RAHA</h2>
      </Link>


      {/* <div className="flex items-center gap-6 min-w-[180px] justify-center"> */}
        {/* Navigation */}
        {/* <nav className="flex items-center gap-6 whitespace-nowrap">
          <Link
            href="/"
            className={`text-lg font-medium ${
              pathname === "/" ? "text-yellow-300" : "text-white"
            }`}
          >
            Home
          </Link>
          <Link
            href="/search"
            className={`text-lg font-medium ${
              pathname === "/admin" ? "text-yellow-300" : "text-white"
            }`}
          >
            Admin
          </Link>
        </nav> */}
      {/* </div> */}
    </header>
  );
}
