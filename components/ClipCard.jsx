import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { FiHeart } from 'react-icons/fi'
import testthumbnail from '../public/test-thumbnail.png'

export default function ClipCard({ NFT, isOnLandingPage }) {
  const router = useRouter()

  const { clip, description, game, itemId, name, owner, price, seller, tag, thumbnail } = NFT

  function goToNFT() {
    router.push(`/nfts/${itemId}`)
  }

  const addressLength = seller.length

  const formattedAddress = `${seller.charAt(0)}${seller.charAt(1)}${seller.charAt(2)}${seller.charAt(3)}....${seller.charAt(addressLength - 4)}${seller.charAt(addressLength - 3)}${seller.charAt(addressLength - 2)}${seller.charAt(addressLength - 1)}`

  return (
    <div className={`bg-gray-light px-2 py-3 rounded-xl ${isOnLandingPage && 'w-1/3'}`}>
      <div className='w-full h-40 relative'>
        <Image
          className='cursor-pointer'
          src={thumbnail}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className='w-full flex flex-col items-start text-left px-2'>
        <div className='my-2'>
          <h6 className='text-gray-mute font-semibold text-xs'>{game}</h6>
          <p className='text-primary text-sm'>{name}</p>
        </div>
        <div className='my-2 w-full flex flex-row justify-between items-center'>
          <div className=''>
            <h6 className='text-gray-mute font-semibold text-xs'>Price</h6>
            <p className='text-primary text-sm'>{price}</p>
          </div>
          <div className=''>
            <h6 className='text-gray-mute font-semibold text-xs'>Creator</h6>
            <p className='text-primary text-sm'>{formattedAddress}</p>
          </div>
        </div>
        <div className='my-2 w-full flex flex-row justify-between items-center'>
          <button onClick={goToNFT} className='bg-primary text-black text-sm px-2 py-1 font-semibold rounded-lg'>View NFT</button>
          <FiHeart className='text-red text-base cursor-pointer' />
        </div>
      </div>
    </div>
  )
}