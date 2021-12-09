import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [nfts, setNfts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const [ownedNfts, setOwnedNfts] = useState([])
  const [createdNfts, setCreatedNfts] = useState([])
  const [soldNfts, setSoldNfts] = useState([])

  useEffect(() => {
    loadNFTs()
    loadOwnedNFTs()
  }, [])

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
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

  async function loadOwnedNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        clip: meta.data.clip,
        thumbnail: meta.data.thumbnail,
        name: meta.data.name,
        description: meta.data.desc,
        game: meta.data.game,
        tag: meta.data.tag
      }
      return item
    }))

    setOwnedNfts(items)
  }

  async function loadCreatedNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        itemId: i.itemId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        clip: meta.data.clip,
        thumbnail: meta.data.thumbnail,
        name: meta.data.name,
        description: meta.data.desc,
        game: meta.data.game,
        tag: meta.data.tag
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSoldNfts(soldItems)
    setCreatedNfts(items)
  }

  return <Component {...pageProps} NFTs={nfts} createdNFTs={createdNfts} ownedNFTs={ownedNfts} soldNFTs={soldNfts} />
}

export default MyApp
