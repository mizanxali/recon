import Link from 'next/link'
import Image from 'next/image'

import logo from '../public/recon.png'

export default function Footer() {
  return (
    <div className='bg-primary p-12 w-full h-60 flex flex-row justify-between'>
      <div className='flex flex-col items-start justify-center'>
        <Image
          className='cursor-pointer'
          src={logo}
          width={130}
          height={40}
        />
        <h1 className='text-black text-lg'>Marketplace for gaming NFT clips.</h1>
        <p className='text-black text-base'>Treating gameplay like the art it is.</p>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}