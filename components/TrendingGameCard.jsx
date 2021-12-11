import Image from 'next/image'
import Link from 'next/link'
import valorantlogo from '../public/valorant-logo.svg'
import csgologo from '../public/csgo-logo.png'
import fortnitelogo from '../public/fortnite-logo.jpg'
import { CSGO_GAME_ID, FORTNITE_GAME_ID, GAME_KEYS, GAME_NAMES, VALORANT_GAME_ID } from '../constants'

export default function TrendingGameCard({ gameId }) {
  switch (gameId) {
    case VALORANT_GAME_ID:
      return (
        <Link href={`explore/${GAME_KEYS[gameId]}`}>
          <div className='bg-gray-light flex flex-row px-2 py-3 cursor-pointer my-4 items-center justify-between rounded-lg'>
            <div className='w-16 h-16 bg-valorant rounded-lg flex items-center justify-center p-2'>
              <Image
                className='cursor-pointer'
                src={valorantlogo}
                width={75}
                height={75}
              />
            </div>
            <div className='w-2/3'><h1 className='font-semibold text-white text-lg text-left'>{GAME_NAMES[gameId]}</h1></div>
          </div>
        </Link>
      )

    case CSGO_GAME_ID:
      return (
        <Link href={`explore/${GAME_KEYS[gameId]}`}>
          <div className='bg-gray-light flex flex-row px-2 py-3 cursor-pointer my-4 items-center justify-between rounded-lg'>
            <div className='w-16 h-16 bg-csgo rounded-lg flex items-center justify-center p-2'>
              <Image
                className='cursor-pointer'
                src={csgologo}
                width={80}
                height={50}
              />
            </div>
            <div className='w-2/3'><h1 className='font-semibold text-white text-lg text-left'>{GAME_NAMES[gameId]}</h1></div>
          </div>
        </Link>
      )

    case FORTNITE_GAME_ID:
      return (
        <Link href={`explore/${GAME_KEYS[gameId]}`}>
          <div className='bg-gray-light flex flex-row px-2 py-3 cursor-pointer my-4 items-center justify-between rounded-lg'>
            <div className='w-16 h-16 bg-fortnite rounded-lg flex items-center justify-center p-2'>
              <Image
                className='cursor-pointer'
                src={fortnitelogo}
                width={65}
                height={40}
              />
            </div>
            <div className='w-2/3'><h1 className='font-semibold text-white text-lg text-left'>{GAME_NAMES[gameId]}</h1></div>
          </div>
        </Link>
      )

    default:
      return null
  }

}