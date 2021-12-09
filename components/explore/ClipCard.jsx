import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { FiHeart } from 'react-icons/fi'
import testthumbnail from '../../public/test-thumbnail.png'

export default function ClipCard({ NFT }) {
  const router = useRouter()

  const { clip, description, game, itemId, name, owner, price, seller, tag, thumbnail } = NFT

  function goToNFT() {
    router.push(`/nfts/${itemId}`)
  }

  return (
    <div className='bg-gray-light py-1 px-1 rounded-xl'>
      <Image
        className='cursor-pointer'
        src={thumbnail}
        width={40}
        height={40}
      />
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
            <p className='text-primary text-sm'>{seller}</p>
          </div>
        </div>
        <div className='my-2 w-full flex flex-row justify-between items-center'>
          <button onClick={goToNFT} className='bg-primary text-black text-sm px-2 py-1 font-semibold rounded-lg'>Buy Now</button>
          <FiHeart className='text-red text-base' />
        </div>
      </div>
    </div>
  )
}