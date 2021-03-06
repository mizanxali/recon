import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import ClipCard from '../../components/ClipCard'
import { AiOutlineYoutube } from 'react-icons/ai'
import { FiTwitter, FiTwitch } from 'react-icons/fi'
import { MdOutlineEdit } from 'react-icons/md'

import pfp from '../../public/pfp.png'

export default function Profile({ ownedNFTs, createdNFTs, soldNFTs, walletAddress }) {
  const [tab, setTab] = useState('owned')

  let formattedAddress = ''

  if (walletAddress) {
    const addressLength = walletAddress.length
    formattedAddress = `${walletAddress.charAt(0)}${walletAddress.charAt(1)}${walletAddress.charAt(2)}${walletAddress.charAt(3)}....${walletAddress.charAt(addressLength - 4)}${walletAddress.charAt(addressLength - 3)}${walletAddress.charAt(addressLength - 2)}${walletAddress.charAt(addressLength - 1)}`
  }

  return (
    <>
      <Head>
        <title>Profile | Recon</title>
        <meta name='description' content='NFT Marketplace for gamers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='h-screen flex flex-col overflow-hidden'>
        <Navbar />
        {walletAddress ? <>
          <div className='h-44 bg-gray-light flex items-center justify-center'>
            <h1 className='float-right text-primary text-2xl font-bold italic'>Treating gameplay like the art it is.</h1>
          </div>
          <ProfileInfo
            totalOwned={ownedNFTs.length}
            totalCreated={createdNFTs.length}
            totalSold={soldNFTs.length}
            walletAddress={formattedAddress}
          />
          <div className='flex flex-row text-center overflow-hidden'>
            <div className='w-1/4 text-center py-12 px-6'>
              <div className='w-full'></div>
            </div>
            <div className='w-3/4 px-6 pt-4 overflow-y-scroll'>
              <MyNFTs
                tab={tab}
                setTab={setTab}
                ownedNFTs={ownedNFTs}
                createdNFTs={createdNFTs}
                soldNFTs={soldNFTs}
              />
            </div>
          </div>
        </> : <h1 className='mx-auto my-32 text-center text-xl font-bold text-primary'>Connect your MetaMask wallet to access this page.</h1>}
      </div>
    </>
  )
}

const ProfileInfo = ({ walletAddress, totalOwned, totalCreated, totalSold }) => {
  return (
    <div className='w-80 absolute top-36 left-10 z-10 rounded-xl bg-gray-light drop-shadow-2xl border-2 border-black'>
      <div className='p-2 flex flex-col items-center justify-evenly'>
        <div className='my-5 flex flex-col items-center justify-center'>
          <Image
            className='mt-3 cursor-pointer'
            src={pfp}
            width={115}
            height={110}
          />
          <h6 className='mt-3 text-gray-mute font-semibold text-lg'>{walletAddress}</h6>
        </div>
        <button className='my-2 bg-primary text-black text-xl px-8 font-semibold rounded-lg'><MdOutlineEdit className='inline text-2xl my-3' /> Edit Profile</button>
        <div className='my-5 w-4/5'>
          <div className='flex flex-row justify-between mb-3 text-white text-base font-semibold'><span>Total Collected</span><span>{totalOwned}</span></div>
          <div className='flex flex-row justify-between mb-3 text-white text-base font-semibold'><span>Total Created</span><span>{totalCreated}</span></div>
          <div className='flex flex-row justify-between mb-3 text-white text-base font-semibold'><span>Total Sold</span><span>{totalSold}</span></div>
        </div>
        <div className='my-5 w-4/5 flex flex-row justify-evenly'>
          <AiOutlineYoutube className='cursor-pointer text-white font-semibold text-2xl' />
          <FiTwitter className='cursor-pointer text-white font-semibold text-2xl' />
          <FiTwitch className='cursor-pointer text-white font-semibold text-2xl' />
        </div>
      </div>
    </div>
  )
}

const MyNFTs = ({ tab, setTab, ownedNFTs, createdNFTs, soldNFTs }) => {
  switch (tab) {
    case 'owned':
      return (
        <>
          <div className='flex flex-row w-full justify-start'>
            <button className='text-xl px-12 mr-2 py-2 bg-primary text-black font-bold rounded-xl'>Collected</button>
            <button onClick={() => setTab('created')} className='text-xl px-12 ml-2 py-2 text-white font-bold rounded-xl'>Created</button>
            <button onClick={() => setTab('sold')} className='text-xl px-12 ml-2 py-2 text-white font-bold rounded-xl'>Sold</button>
          </div>
          <div className='my-6 mx-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {ownedNFTs.map((NFT, i) => <ClipCard key={i} NFT={NFT} />)}
          </div>
        </>
      )
    case 'created':
      return (
        <>
          <div className='flex flex-row w-full justify-start'>
            <button onClick={() => setTab('owned')} className='text-xl px-12 mr-2 py-2 text-white font-bold rounded-xl'>Collected</button>
            <button className='text-xl px-12 ml-2 py-2 bg-primary text-black font-bold rounded-xl'>Created</button>
            <button onClick={() => setTab('sold')} className='text-xl px-12 ml-2 py-2 text-white font-bold rounded-xl'>Sold</button>
          </div>
          <div className='my-6 mx-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {createdNFTs.map((NFT, i) => <ClipCard key={i} NFT={NFT} />)}
          </div>
        </>
      )
    case 'sold':
      return (
        <>
          <div className='flex flex-row w-full justify-start'>
            <button onClick={() => setTab('owned')} className='text-xl px-12 mr-2 py-2 text-white font-bold rounded-xl'>Collected</button>
            <button onClick={() => setTab('created')} className='text-xl px-12 ml-2 py-2 text-white font-bold rounded-xl'>Created</button>
            <button className='text-xl px-12 ml-2 py-2 bg-primary text-black font-bold rounded-xl'>Sold</button>
          </div>
          <div className='my-6 mx-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {soldNFTs.map((NFT, i) => <ClipCard key={i} NFT={NFT} />)}
          </div>
        </>
      )
    default:
      return null
  }
}