import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { FiUpload } from 'react-icons/fi'
import { BsCheck2Square } from 'react-icons/bs'
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function Create({ walletAddress }) {
  const router = useRouter()

  const [clipFileName, setClipFileName] = useState('')
  const [thumbnailFileName, setThumbnailFileName] = useState('')

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [game, setGame] = useState('Valorant')
  const [tag, setTag] = useState('Competitive')
  const [price, setPrice] = useState('')

  const [isUploadClipDisabled, setIsUploadClipDisabled] = useState(false)
  const [isUploadThumbnailDisabled, setIsUploadThumbnailDisabled] = useState(false)

  const [clipFileUrl, setClipFileUrl] = useState(null)
  const [thumbnailFileUrl, setThumbnailFileUrl] = useState(null)

  function openClipInput() {
    var inputEl = document.getElementById('clip-upload')
    inputEl.click()
  }

  function openThumbnailInput() {
    var inputEl = document.getElementById('thumbnail-upload')
    inputEl.click()
  }

  async function onClipUpload(e) {
    setIsUploadClipDisabled(true)

    const file = e.target.files[0]
    setClipFileName(file.name)

    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setClipFileUrl(url)
    } catch (error) {
      console.log('Error uploading clip file: ', error)
    }
  }

  async function onThumbnailUpload(e) {
    setIsUploadThumbnailDisabled(true)

    const file = e.target.files[0]
    setThumbnailFileName(file.name)

    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setThumbnailFileUrl(url)
    } catch (error) {
      console.log('Error uploading thumbnail file: ', error)
    }
  }

  async function createMarketItem() {
    if (!name || !desc || !game || !tag || !price || !clipFileUrl || !thumbnailFileUrl) return

    const data = JSON.stringify({
      name, desc, game, tag, thumbnail: thumbnailFileUrl, clip: clipFileUrl
    })

    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      createSale(url)
    } catch (error) {
      console.log('Error uploading data to IPFS: ', error)
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_ADDRESS, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const thePrice = ethers.utils.parseUnits(price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(process.env.NEXT_PUBLIC_NFT_ADDRESS, tokenId, thePrice, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  function onSubmitNFT() {
    createMarketItem()
  }

  return (
    <div className='min-h-screen'>
      <Head>
        <title>Explore | Recon</title>
        <meta name='description' content='NFT Marketplace for gamers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      {walletAddress ? <>
        <div className='text-center'>
          <div className='mx-48'>
            <h1 className='my-8 text-primary text-3xl text-left font-bold'>Create your NFT</h1>
            <main className='w-full flex flex-row justify-between'>
              <div>
                <h3 className='text-xl text-left my-3 font-semibold text-primary'>Upload your clip</h3>
                <h6 className='text-sm text-left text-gray-mute my-5'>All video file types supported. Max size: 10GB.</h6>
                <div className='w-96 h-80 flex bg-gray-light rounded-lg border-2 border-primary cursor-pointer' onClick={openClipInput}>
                  <input type='file' id='clip-upload' className='w-full h-full hidden' onChange={onClipUpload} disabled={isUploadClipDisabled} />
                  {isUploadClipDisabled ? <BsCheck2Square className='text-7xl mx-auto my-auto text-primary' /> : <FiUpload className='text-7xl mx-auto my-auto text-primary' />}
                </div>
                <p className='my-2 text-primary text-sm'>{clipFileName}</p>
              </div>
              <div>
                <h3 className='text-xl text-left my-3 font-semibold text-primary'>Thumbnail</h3>
                <h6 className='text-sm text-left text-gray-mute my-5'>File types supported: JPEGs, JPGs, PNGs. Max size: 10GB.</h6>
                <div className='w-96 h-80 flex bg-gray-light rounded-lg border-2 border-primary cursor-pointer' onClick={openThumbnailInput}>
                  <input type='file' id='thumbnail-upload' className='w-full h-full hidden' onChange={onThumbnailUpload} disabled={isUploadThumbnailDisabled} />
                  {isUploadThumbnailDisabled ? <BsCheck2Square className='text-7xl mx-auto my-auto text-primary' /> : <FiUpload className='text-7xl mx-auto my-auto text-primary' />}
                </div>
                <p className='my-5 text-primary text-sm'>{thumbnailFileName}</p>
              </div>
            </main>
            <div className=''>
              <h3 className='text-primary text-xl text-left font-semibold my-5'>Name</h3>
              <input type='text' onChange={e => setName(e.target.value)} placeholder='Every sick clip deserves a great name!' className='drop-shadow-xl mb-5 text-primary mx-auto w-full outline-none bg-gray py-2 px-4 rounded-lg' />
              <h3 className='text-primary text-xl text-left font-semibold my-5'>Description</h3>
              <textarea onChange={e => setDesc(e.target.value)} placeholder='Tell the world about everything this clip contains.......' rows='6' className='drop-shadow-xl mb-5 text-primary mx-auto w-full outline-none bg-gray py-2 px-4 rounded-lg' />
              <div className='flex flex-row w-full justify-evenly'>
                <div className='w-1/2'>
                  <h3 className='text-primary text-xl text-left font-semibold my-5'>Game</h3>
                  <div className='drop-shadow-xl mb-5 float-left rounded-lg bg-gray-light px-4'>
                    <select onChange={e => setGame(e.target.value)} className='px-4 py-2 bg-gray-light text-primary outline-none'>
                      <option>Valorant</option>
                      <option>CS:GO</option>
                      <option>Fortnite</option>
                    </select>
                  </div>
                </div>
                <div className='w-1/2'>
                  <h3 className='text-primary text-xl text-left font-semibold my-5'>Tag</h3>
                  <div className='drop-shadow-xl mb-5 float-left rounded-lg bg-gray-light px-4'>
                    <select onChange={e => setTag(e.target.value)} className='px-4 py-2 bg-gray-light text-primary outline-none'>
                      <option>Competitive</option>
                      <option>Casual</option>
                    </select>
                  </div>
                </div>
              </div>
              <h3 className='text-primary text-xl text-left font-semibold my-5'>Listing Price (MATIC)</h3>
              <input type='text' onChange={e => setPrice(e.target.value)} placeholder='Set the base price at which you would like to list this clip....' className='drop-shadow-xl mb-5 text-primary mx-auto w-full outline-none bg-gray py-2 px-4 rounded-lg' />
              <hr className='text-gray-mute my-5' />
              <button onClick={onSubmitNFT} className='my-5 float-left bg-primary text-black text-xl px-10 py-2 font-bold rounded-lg'>Create</button>
            </div>
          </div>
        </div>
      </> : <h1 className='my-32 mx-auto text-center text-xl font-bold text-primary'>Connect your MetaMask wallet to access this page.</h1>}
    </div>
  )
}