import Link from 'next/link'
import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { FiMenu } from 'react-icons/fi'
import { useState } from 'react'

import logo from '../public/recon.png'

export default function Navbar() {

  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false)

  function toggleNavbar() {
    setIsNavbarExpanded(!isNavbarExpanded)
  }

  return isNavbarExpanded ?
    <div className='flex flex-col bg-primary px-6 drop-shadow-md pb-2'>
      <div className='flex flex-row justify-between items-center bg-primary text-black h-14'>
        <Link href='/'>
          <Image
            onClick={toggleNavbar}
            className='cursor-pointer'
            src={logo}
            width={130}
            height={40}
          />
        </Link>
        <FiMenu onClick={toggleNavbar} className='md:hidden cursor-pointer font-bold hover:text-white block text-2xl mx-3' />
      </div>
      <Link href='/explore'>
        <a onClick={toggleNavbar} className='my-1.5 hover:text-white mx-3 text-base md:text-lg font-bold'>Explore</a>
      </Link>
      <Link href='/about'>
        <a onClick={toggleNavbar} className='my-1.5 hover:text-white mx-3 text-base md:text-lg font-bold'>About Us</a>
      </Link>
      <Link href='/create'>
        <a onClick={toggleNavbar} className='my-1.5 hover:text-white mx-3 text-base md:text-lg font-bold'>Create</a>
      </Link>
      <Link href='/profile'>
        <a onClick={toggleNavbar} className='my-1.5 hover:text-white mx-3 text-base md:text-lg font-bold'>Profile</a>
      </Link>
    </div>
    :
    <div className='flex flex-row justify-between items-center bg-primary text-black px-6 md:px-10 h-14 drop-shadow-md'>
      <Link href='/'>
        <Image
          className='cursor-pointer'
          src={logo}
          width={130}
          height={40}
        />
      </Link>
      <FiMenu onClick={toggleNavbar} className='md:hidden cursor-pointer font-bold hover:text-white block text-2xl mx-3' />
      <div className='hidden md:flex flex-row items-center'>
        <Link href='/explore'>
          <a className='hover:text-white mx-3 text-base md:text-lg font-bold'>Explore</a>
        </Link>
        <Link href='/about'>
          <a className='hover:text-white mx-3 text-base md:text-lg font-bold'>About Us</a>
        </Link>
        <Link href='/create'>
          <a className='hover:text-white mx-3 text-base md:text-lg font-bold'>Create</a>
        </Link>
        <Link href='/profile'>
          <CgProfile className='cursor-pointer font-bold hover:text-white block text-2xl mx-3' />
        </Link>
      </div>
    </div>
}