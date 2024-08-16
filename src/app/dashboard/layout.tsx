"use client";

import { SignedIn } from "@clerk/nextjs";
import { ReactNode } from "react";
import SideNav from "./_components/SideNav";
import { Menu } from "lucide-react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SignedIn>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative">
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost hover:bg-transparent drawer-button lg:hidden absolute top-4 left-4"
          >
            <Menu />
          </label>
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="w-64 bg-white shadow-md h-full">
            <SideNav />
          </div>
        </div>
      </div>
    </SignedIn>
  );
};

export default DashboardLayout;
