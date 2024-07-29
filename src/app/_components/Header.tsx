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
  const path = usePathname()
  useEffect(()=>{
console.log(path)
  },[])
  console.log(user)
  return !path.includes('aiform')&&(
    <div className="p-3 border shadow-sm">
      {/* logo */}
      <div className="flex items-center justify-between">
        <Image src={logo} width={200} height={200} alt="logo" />
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
