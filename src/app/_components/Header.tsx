import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='p-3 border shadow-sm' >
{/* logo */}
<div className='flex items-center justify-between'>
        <Image src={logo} width={50} height={50} alt="logo"/>
      <Button className='hover:bg-customHover'>Get started</Button>
      </div>

    </div>
  )
}

export default Header