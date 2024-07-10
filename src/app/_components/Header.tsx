"use client";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  console.log(user)
  return (
    <div className="p-3 border shadow-sm">
      {/* logo */}
      <div className="flex items-center justify-between">
        <Image src={logo} width={50} height={50} alt="logo" />
        {isSignedIn ? (
          <div className="flex items-center gap-5">
           <Link href={'/dashboard'}>
            <Button variant="outline">Dashboard</Button></Link> <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button className="hover:bg-customHover">Get started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Header;
