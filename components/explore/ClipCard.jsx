import Image from 'next/image'
import { FiHeart } from 'react-icons/fi'
import testthumbnail from '../../public/test-thumbnail.png'

export default function ClipCard() {
  return (
    <div className='bg-gray-light py-1 px-1 rounded-xl'>
      <Image
        className='cursor-pointer'
        src={testthumbnail}
      />
      <div className='w-full flex flex-col items-start text-left px-2'>
        <div className='my-2'>
          <h6 className='text-gray-mute font-semibold text-xs'>Valorant</h6>
          <p className='text-primary text-sm'>Insane spray transfer 3K on Bind!</p>
        </div>
        <div className='my-2 w-full flex flex-row justify-between items-center'>
          <div className=''>
            <h6 className='text-gray-mute font-semibold text-xs'>Price</h6>
            <p className='text-primary text-sm'>0.3 ETH</p>
          </div>
          <div className=''>
            <h6 className='text-gray-mute font-semibold text-xs'>Creator</h6>
            <p className='text-primary text-sm'>mizanxali</p>
          </div>
        </div>
        <div className='my-2 w-full flex flex-row justify-between items-center'>
          <button className='bg-primary text-black text-sm px-2 py-1 font-semibold rounded-lg'>Buy Now</button>
          <FiHeart className='text-red text-base' />
        </div>
      </div>
    </div>
  )
}