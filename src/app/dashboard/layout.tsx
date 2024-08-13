"use client"
import { SignedIn, useUser } from "@clerk/nextjs"
import { ReactNode } from "react"
import SideNav from "./_components/SideNav"

const DashboardLayout = ({children}:{children : ReactNode}) => {
 
  return (
    <SignedIn>
    <div>
  <div className="md:w-64 fixed">
    <SideNav/>
  </div>
  <div className="md:ml-64">
    {children}
    </div>
    </div>
    </SignedIn>
  )
}

export default DashboardLayout