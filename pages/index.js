import Link from 'next/link'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClipCard from '../components/ClipCard'
import { GiWallet } from 'react-icons/gi'
import { BsCollectionPlayFill, BsArrowRight } from 'react-icons/bs'
import { MdManageSearch } from 'react-icons/md'
import TrendingGameCard from '../components/TrendingGameCard'
import { GAME_NAMES } from '../constants'
import { FiArrowRight } from 'react-icons/fi'

export default function Home({ NFTs }) {

  const randomNFT = NFTs[Math.floor(Math.random() * NFTs.length)]

  return (
    <>
      <Navbar />
      <div className='text-center'>
        <Head>
          <title>RECON</title>
          <meta name='description' content='NFT Marketplace for gamers' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className='flex flex-row h-96'>
          <section className='h-full w-1/2 flex flex-col items-start justify-center px-32'>
            <h1 className='my-1 text-4xl text-primary font-bold'>Welcome to Recon.</h1>
            <h6 className='my-1 text-lg text-white font-semibold'>Treating gameplay like the art it is.</h6>
            <Link href='/explore'>
              <button className='my-2 bg-primary text-black text-xl px-6 py-2 font-bold rounded-lg'>Explore <FiArrowRight className='text-2xl inline ml-3' /></button>
            </Link>
          </section>
          <section className='h-full w-1/2 bg-primary flex flex-col items-center justify-center'>
            {randomNFT && <ClipCard NFT={randomNFT} isOnLandingPage={true} />}
          </section>
        </main>
        <div className='py-8 w-5/6 mx-auto'>
          <h1 className='text-2xl text-primary text-center font-semibold'>Collect and Sell NFTs</h1>
          <div className='flex flex-row h-56 mx-auto my-4'>
            <div className='h-full w-1/3 flex flex-col items-center justify-evenly bg-gray-light px-6 text-white'>
              <GiWallet className='block text-7xl text-primary' />
              <h6 className='font-semibold text-sm'>Transfer funds to your wallet.</h6>
            </div>
            <div className='h-full w-1/3 flex flex-col items-center justify-evenly bg-primary text-black'>
              <MdManageSearch className='block text-7xl' />
              <h6 className='font-semibold text-sm'>Explore a wide range of NFTs available on the platform.</h6>
            </div>
            <div className='h-full w-1/3 flex flex-col items-center justify-evenly bg-gray-light px-6 text-white'>
              <BsCollectionPlayFill className='block text-7xl text-primary' />
              <h6 className='font-semibold text-sm'>Collect and share your favourite clips.</h6>
            </div>
          </div>
        </div>
        <div className='py-8 w-5/6 mx-auto'>
          <h1 className='text-2xl text-primary text-center font-semibold'>Trending Games</h1>
          <div className='my-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
            {GAME_NAMES.map((game, i) => <TrendingGameCard key={i} gameId={i} />)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

