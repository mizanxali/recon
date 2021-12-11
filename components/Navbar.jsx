import Link from 'next/link'
import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { IoWalletOutline } from 'react-icons/io5'

import logo from '../public/recon.png'

export default function Navbar() {
  return (
    <div className='flex flex-row justify-between items-center bg-primary text-black px-10 h-14'>
      <Link href='/'>
        <Image
          className='cursor-pointer'
          src={logo}
          width={130}
          height={40}
        />
      </Link>
      <div className='hidden md:flex flex-row items-center'>
        <Link href='/explore'>
          <a className='hover:text-white mx-3 text-lg font-bold'>Explore</a>
        </Link>
        <Link href='/about'>
          <a className='hover:text-white mx-3 text-lg font-bold'>About Us</a>
        </Link>
        <Link href='/create'>
          <a className='hover:text-white mx-3 text-lg font-bold'>Create</a>
        </Link>
        <Link href='/profile'>
          <CgProfile className='cursor-pointer font-bold hover:text-white block text-2xl mx-3' />
        </Link>
      </div>
    </div>
  )
}