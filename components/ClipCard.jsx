import Image from 'next/image'
import { useRouter } from 'next/router'
import { FiHeart } from 'react-icons/fi'
import { FaRegDotCircle } from 'react-icons/fa'

export default function ClipCard({ NFT, isOnLandingPage }) {
  const router = useRouter()

  const { clip, description, game, itemId, name, owner, price, seller, tag, thumbnail } = NFT

  function goToNFT() {
    router.push(`/nfts/${itemId}`)
  }

  const addressLength = seller.length
  const formattedAddress = `${seller.charAt(0)}${seller.charAt(1)}${seller.charAt(2)}${seller.charAt(3)}....${seller.charAt(addressLength - 4)}${seller.charAt(addressLength - 3)}${seller.charAt(addressLength - 2)}${seller.charAt(addressLength - 1)}`

  return (
    <div className={`bg-gray-light px-2 py-3 rounded-xl drop-shadow-lg ${isOnLandingPage && 'md:w-1/3'}`}>
      <div className='w-full h-40 relative'>
        {tag === 'Casual' ? <FaRegDotCircle className='text-blue text-xl z-10 top-1 left-0 absolute' /> : <FaRegDotCircle className='text-yellow text-xl z-10 top-1 left-0 absolute' />}
        <div className='z-0'>
          <Image
            className='z-0'
            src={thumbnail}
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
      <div className='w-full flex flex-col items-start text-left px-2'>
        <div className='my-2'>
          <h6 className='text-gray-mute font-bold text-3xs md:text-xs'>{game}</h6>
          <p className='text-primary font-bold text-xs md:text-base'>{name}</p>
        </div>
        <div className='my-2 w-full flex flex-row justify-between items-center'>
          <div className=''>
            <h6 className='text-gray-mute font-bold text-3xs md:text-xs'>Price</h6>
            <p className='text-primary text-xs md:text-base font-semibold'>{price} MATIC</p>
          </div>
          <div className=''>
            <h6 className='text-gray-mute font-bold text-3xs md:text-xs'>Creator</h6>
            <p className='text-primary text-xs md:text-base font-semibold'>{formattedAddress}</p>
          </div>
        </div>
        <div className='my-2 w-full flex flex-row justify-between items-center'>
          <button onClick={goToNFT} className='bg-primary text-black text-3xs md:text-sm px-3 py-1 mx-1 font-bold rounded-lg'>View</button>
          <FiHeart className='mx-2 text-red text-xl cursor-pointer' />
        </div>
      </div>
    </div>
  )
}