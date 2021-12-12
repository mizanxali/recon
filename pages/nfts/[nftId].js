import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'
import { FiHeart } from 'react-icons/fi'
import { FaRegDotCircle } from 'react-icons/fa'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

import Navbar from '../../components/Navbar'
import { useState } from 'react'

export default function NFTPage({ NFTs, ownedNFTs, createdNFTs, soldNFTs }) {
  const router = useRouter()
  const { nftId } = router.query
  console.log(nftId);

  let showBuyButton = true

  console.log(NFTs);

  let theNFT = NFTs.find(x => x.itemId == nftId)

  if (!theNFT) {
    theNFT = ownedNFTs.find(x => x.itemId == nftId)
    if (theNFT) showBuyButton = false
  }
  if (!theNFT) {
    theNFT = createdNFTs.find(x => x.itemId == nftId)
    if (theNFT) showBuyButton = false
  }
  if (!theNFT) {
    theNFT = soldNFTs.find(x => x.itemId == nftId)
    if (theNFT) showBuyButton = false
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(process.env.NEXT_PUBLIC_NFT_ADDRESS, nft.itemId, {
      value: price
    })
    await transaction.wait()
    router.push('/')
  }

  if (!theNFT) return (
    <>
      <Head>
        <title>{nftId} | Recon</title>
        <meta name='description' content='NFT Marketplace for gamers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='h-screen flex flex-col overflow-hidden'>
        <Navbar />
        <h1 className='m-auto text-2xl text-center text-primary font-semibold'>This NFT does not exist.</h1>
      </div>
    </>
  )

  const { clip, description, game, itemId, name, owner, price, seller, tag, thumbnail } = theNFT

  const sellerAddressLength = seller.length
  const sellerFormattedAddress = `${seller.charAt(0)}${seller.charAt(1)}${seller.charAt(2)}${seller.charAt(3)}....${seller.charAt(sellerAddressLength - 4)}${seller.charAt(sellerAddressLength - 3)}${seller.charAt(sellerAddressLength - 2)}${seller.charAt(sellerAddressLength - 1)}`
  const ownerAddressLength = owner.length
  const ownerFormattedAddress = `${owner.charAt(0)}${owner.charAt(1)}${owner.charAt(2)}${owner.charAt(3)}....${owner.charAt(ownerAddressLength - 4)}${owner.charAt(ownerAddressLength - 3)}${owner.charAt(ownerAddressLength - 2)}${owner.charAt(ownerAddressLength - 1)}`
  const showOwnerAddress = owner !== '0x0000000000000000000000000000000000000000'
  const showSellerAddress = !showOwnerAddress

  return (
    <>
      <Head>
        <title>{nftId} | Recon</title>
        <meta name='description' content='NFT Marketplace for gamers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='h-screen flex flex-col overflow-hidden'>
        <Navbar />
        <div className='flex flex-col md:flex-row'>
          <div className='w-2/3 border-2 border-primary m-5 rounded-lg p-1'>
            <Player
              playsInline
              poster={thumbnail}
              src={clip}
            />
          </div>
          <div className='w-1/3 flex flex-col justify-center px-10'>
            <h6 className='my-2 text-gray-mute text-lg font-semibold'>{game}</h6>
            <h1 className='mb-2 text-2xl text-white font-bold'>{name}</h1>
            <div className='my-2 w-full flex flex-row text-base justify-between items-center font-semibold'>
              {showSellerAddress && <h6 className='my-2 text-gray-mute'>Created by <span className='text-primary text-xs'>{sellerFormattedAddress}</span></h6>}
              {showOwnerAddress && <h6 className='my-2 text-gray-mute'>Owned by <span className='text-primary text-xs'>{ownerFormattedAddress}</span></h6>}
              <h6 className='text-gray-mute'>
                <FaRegDotCircle className='text-yellow inline mx-1' />
                {tag}
              </h6>
              <h6 className='text-gray-mute'>
                <FiHeart className='text-red inline mx-1' />
                167
              </h6>
            </div>
            <p className='my-2 text-lg text-white font-semibold'>{description}</p>
            <h6 className='mt-2 text-gray-mute text-lg font-semibold'>Price</h6>
            <h3 className='my-2 text-white text-xl font-bold'>{price} MATIC</h3>
            {showBuyButton && <button onClick={() => buyNft(theNFT)} className='my-2 w-1/3 bg-primary text-black text-lg px-2 py-1 font-bold rounded-lg'>Buy Now</button>}
          </div>
        </div>
      </div>
    </>
  )
}