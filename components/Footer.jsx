import Image from 'next/image'

import logo from '../public/recon.png'

export default function Footer() {
  return (
    <div className='bg-primary px-32 py-12 w-full flex flex-row justify-between'>
      <div className='flex flex-col items-start'>
        <Image
          className='cursor-pointer'
          src={logo}
          width={130}
          height={40}
        />
        <h1 className='my-1 text-black text-lg'>Marketplace for gaming NFT clips.</h1>
        <p className='my-1 text-black text-base'>Treating gameplay like the art it is.</p>
      </div>
      <div className='flex flex-col items-start'>
        <h1 className='my-1 text-black text-lg font-bold'>Subscribe</h1>
        <p className='my-1 text-black text-base'>Subscribe to be up to date with latest collections and games.</p>
        <div className='my-1 flex flex-row justify-between items-center w-full'>
          <input type='text' placeholder='Enter your email address...' className='text-xs px-10 py-2 text-primary outline-none bg-white rounded-lg' />
          <button className='bg-black text-primary text-xs px-10 py-2 font-bold rounded-lg'>Submit</button>
        </div>
      </div>
      <div className='flex flex-col items-start'>
        <h1 className='my-1 text-black text-lg font-bold'>Company</h1>
        <p className='my-1 text-black text-base'>About Us</p>
        <p className='my-1 text-black text-base'>Explore</p>
        <p className='my-1 text-black text-base'>Create</p>
        <p className='my-1 text-black text-base'>Profile</p>
        <p className='my-1 text-black text-base'>Contact Us</p>
      </div>
    </div>
  )
}