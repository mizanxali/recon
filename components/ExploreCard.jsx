import Image from 'next/image'
import Link from 'next/link'
import valorantlogo from '../public/valorant-logo.svg'
import csgologo from '../public/csgo-logo.png'
import fortnitelogo from '../public/fortnite-logo.jpg'
import { CSGO_DESCRIPTION, CSGO_GAME_ID, FORTNITE_DESCRIPTION, FORTNITE_GAME_ID, GAME_KEYS, VALORANT_DESCRIPTION, VALORANT_GAME_ID } from '../../constants'

export default function ExploreCard({ gameId }) {
  return (
    <Link href={`explore/${GAME_KEYS[gameId]}`}>
      <div className='relative cursor-pointer'>
        <div className=' absolute top-7 left-0 right-0 mx-auto z-10'>
          <GameLogo gameId={gameId} />
        </div>
        <GameContent gameId={gameId} />
      </div>
    </Link>
  )
}


const GameLogo = ({ gameId }) => {
  switch (gameId) {
    case VALORANT_GAME_ID:
      return (
        <div className='w-24 h-24 mx-auto p-2 bg-valorant rounded-full border-2 border-gray-light flex items-center justify-center'>
          <Image
            className=''
            src={valorantlogo}
            width={60}
            height={60}
          />
        </div>
      )

    case CSGO_GAME_ID:
      return (
        <div className='w-24 h-24 mx-auto p-2 bg-csgo rounded-full border-2 border-gray-light flex items-center justify-center'>
          <Image
            className=''
            src={csgologo}
            width={60}
            height={40}
          />
        </div>
      )

    case FORTNITE_GAME_ID:
      return (
        <div className='w-24 h-24 mx-auto p-2 bg-fortnite rounded-full border-2 border-gray-light flex items-center justify-center'>
          <Image
            className=''
            src={fortnitelogo}
            width={60}
            height={40}
          />
        </div>
      )

    default:
      return null
  }
}

const GameContent = ({ gameId }) => {
  switch (gameId) {
    case VALORANT_GAME_ID:
      return (
        <>
          <div className='h-20 bg-valorant rounded-t-lg'></div>
          <div className='bg-gray-light rounded-b-lg'>
            <p className='text-white font-semibold text-base pt-12 pb-3 px-3'>{VALORANT_DESCRIPTION}</p>
          </div>
        </>
      )

    case CSGO_GAME_ID:
      return (
        <>
          <div className='h-20 bg-csgo rounded-t-lg'></div>
          <div className='bg-gray-light rounded-b-lg'>
            <p className='text-white font-semibold text-base pt-12 pb-3 px-3'>{CSGO_DESCRIPTION}</p>
          </div>
        </>
      )

    case FORTNITE_GAME_ID:
      return (
        <>
          <div className='h-20 bg-fortnite rounded-t-lg'></div>
          <div className='bg-gray-light rounded-b-lg'>
            <p className='text-white font-semibold text-base pt-12 pb-3 px-3'>{FORTNITE_DESCRIPTION}</p>
          </div>
        </>
      )

    default:
      return null
  }
}