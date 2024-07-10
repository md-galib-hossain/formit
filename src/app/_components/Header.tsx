"use client"
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'

const Header = () => {
  const {user,isSignedIn} = useUser()
  return (
    <div className='p-3 border shadow-sm' >
{/* logo */}
<div className='flex items-center justify-between'>
        <Image src={logo} width={50} height={50} alt="logo"/>
     {
      isSignedIn? <div className='flex items-center gap-5'><Button variant="outline">Dashboard</Button> <UserButton/></div> : <Button className='hover:bg-customHover'>Get started</Button>
     }
     
      
      </div>

    </div>
  )
}

export default Header