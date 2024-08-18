"use client"; 

import React, { ReactNode } from "react";
import { Menu } from "lucide-react";
import { UserContext, UserType } from "@/lib/UserContext";
import SideNav from "./SideNav";

const LayoutClient = ({ user, children }: { user: UserType; children: ReactNode }) => {
  return (
    <UserContext.Provider value={user}>
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
          <div className="w-64 bg-white shadow-md">
            <SideNav user={user} />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default LayoutClient;
