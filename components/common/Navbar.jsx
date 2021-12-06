import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='flex flex-row justify-between items-center h-14 bg-gray-darker text-white px-2'>
      <h1>
        <Link href="/">
          <a className='hover:text-purple mx-4 text-lg font-semibold'>Recon</a>
        </Link>
      </h1>
      <div>
        <Link href="/explore">
          <a className='hover:text-purple mx-4 text-lg font-semibold'>Explore</a>
        </Link>
        <Link href="/create">
          <a className='hover:text-purple mx-4 text-lg font-semibold'>Create</a>
        </Link>
        <Link href="/about">
          <a className='hover:text-purple mx-4 text-lg font-semibold'>About</a>
        </Link>
      </div>
    </div>
  )
}