"use client";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  console.log(user);

  return (
    !path.includes("aiform") && (
      <div className="py-2 px-3 border shadow-sm">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative w-36 h-10 md:w-48 md:h-12 lg:w-56 lg:h-16">
            <Image src={logo} layout="fill" objectFit="contain" alt="logo" />
          </Link>
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <SignInButton>
              <Button className="hover:bg-customHover">Get started</Button>
            </SignInButton>
          )}
        </div>
      </div>
    )
  );
};

export default Header;
