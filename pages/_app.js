import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const [ownedNfts, setOwnedNfts] = useState([])
  const [createdNfts, setCreatedNfts] = useState([])
  const [soldNfts, setSoldNfts] = useState([])

  const [walletAddress, setWalletAddress] = useState(null)

  useEffect(() => {
    loadNFTs()
    loadMyNFTs()
  }, [])

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/SEDsaNI2aHArSTswgw5DVm9GtifvuDW9')
    const tokenContract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_ADDRESS, NFT.abi, provider)
    const marketContract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS, Market.abi, provider)
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        clip: meta.data.clip,
        thumbnail: meta.data.thumbnail,
        name: meta.data.name,
        description: meta.data.desc,
        game: meta.data.game,
        tag: meta.data.tag
      }
      return item
    }))

    setNfts(items)
    setIsLoaded(true)
  }

  async function loadMyNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()

    if (connection.selectedAddress) setWalletAddress(connection.selectedAddress)

    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS, Market.abi, signer)
    const tokenContract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_ADDRESS, NFT.abi, provider)
    const myNFTsData = await marketContract.fetchMyNFTs()
    const createdNFTsData = await marketContract.fetchItemsCreated()

    const myNFTItems = await Promise.all(myNFTsData.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        clip: meta.data.clip,
        thumbnail: meta.data.thumbnail,
        name: meta.data.name,
        description: meta.data.desc,
        game: meta.data.game,
        tag: meta.data.tag
      }
      return item
    }))

    const createdNFTItems = await Promise.all(createdNFTsData.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        clip: meta.data.clip,
        thumbnail: meta.data.thumbnail,
        name: meta.data.name,
        description: meta.data.desc,
        game: meta.data.game,
        tag: meta.data.tag
      }
      return item
    }))

    setOwnedNfts(myNFTItems)
    const soldItems = createdNFTItems.filter(i => i.sold)
    setSoldNfts(soldItems)
    console.log(createdNFTItems);
    setCreatedNfts(createdNFTItems)
  }

  return <Component
    {...pageProps}
    NFTs={nfts}
    createdNFTs={createdNfts}
    ownedNFTs={ownedNfts}
    soldNFTs={soldNfts}
    walletAddress={walletAddress}
    isLoaded={isLoaded}
  />
}

export default MyApp
