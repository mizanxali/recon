import Link from 'next/link'
import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { BiWalletAlt } from 'react-icons/bi'

import logo from '../../public/recon.png'

export default function Navbar() {
  return (
    <div className='flex flex-row justify-between items-center h-14 bg-primary text-black px-2'>
      <Link href="/">
        <Image
          className='cursor-pointer'
          src={logo}
          width={130}
          height={40}
        />
      </Link>
      <div className='hidden md:flex flex-row'>
        <Link href="/explore">
          <a className='hover:text-white mx-3 text-lg font-semibold'>Explore</a>
        </Link>
        <Link href="/create">
          <a className='hover:text-white mx-3 text-lg font-semibold'>Create</a>
        </Link>
        <Link href="/about">
          <a className='hover:text-white mx-3 text-lg font-semibold'>About</a>
        </Link>
        <Link href="/about">
          <CgProfile className='hover:text-white block text-3xl mx-3' />
        </Link>
        <Link href="/about">
          <BiWalletAlt className='hover:text-white block text-3xl mx-3' />
        </Link>
      </div>
    </div>
  )
}