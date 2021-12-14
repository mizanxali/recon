import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import valorantlogo from '../../public/valorant-logo.svg'
import csgologo from '../../public/csgo-logo.png'
import fortnitelogo from '../../public/fortnite-logo.jpg'
import { CSGO_DESCRIPTION, CSGO_GAME_ID, FORTNITE_DESCRIPTION, FORTNITE_GAME_ID, GAME_KEYS, GAME_NAMES, VALORANT_DESCRIPTION, VALORANT_GAME_ID } from '../../constants'
import ClipCard from '../../components/ClipCard'
import { ImSearch } from 'react-icons/im'
import { FiFilter } from 'react-icons/fi'
import { MdOutlineSort } from 'react-icons/md'
import Loader from '../../components/Loader'

export default function Game({ NFTs, isLoading }) {
  console.log(NFTs);

  const router = useRouter()
  const { game } = router.query

  const gameId = GAME_KEYS.indexOf(game)

  if (gameId == -1) {
    //404 not found
  }

  const thisGameNFTs = NFTs.filter(NFT => NFT.game === GAME_NAMES[gameId])

  return (
    <>
      <Head>
        <title>{GAME_NAMES[gameId]} | Recon</title>
        <meta name='description' content='NFT Marketplace for gamers' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='md:h-screen flex flex-col overflow-hidden'>
        <Navbar />
        <div className='flex flex-col md:flex-row text-center overflow-hidden'>
          <div className='w-full md:w-1/6 flex flex-col items-center md:items-start text-center md:text-left border-r-2 border-gray-light px-6 pt-4'>
            <Sidebar gameId={gameId} clipsForSale={thisGameNFTs.length} />
          </div>
          <div className='w-full md:w-5/6 px-1 md:px-6 pt-4 overflow-y-scroll'>
            <div className='flex flex-col md:flex-row justify-between mx-16'>
              <div className='mb-4 md:mb-0 flex items-center justify-start w-full md:w-1/3 rounded-lg bg-gray-light border-2 border-gray-light px-4 py-1 focus:border-2 focus:border-primary'>
                <ImSearch className='text-primary text-base md:text-lg mr-5' />
                <input type='text' className='text-xs md:text-base font-semibold w-full text-primary bg-gray-light border-2 border-gray-light focus:outline-none' placeholder='Search for tags, clips, creators...' />
              </div>
              <div className='flex flex-row justify-between md:block'>
                <button className='w-28 mr-5 py-2 font-semibold bg-gray-light text-gray-mute rounded-lg'>
                  <FiFilter className='inline md:mr-5 text-base md:text-lg text-primary' />
                  <span className='hidden md:inline md:text-base'>Filter</span>
                </button>
                <button className='w-28 ml-5 py-2 font-semibold bg-gray-light text-gray-mute rounded-lg'>
                  <MdOutlineSort className='inline md:mr-5 text-base md:text-lg text-primary' />
                  <span className='hidden md:inline md:text-base'>Sort</span>
                </button>
              </div>
            </div>
            {isLoading ? <Loader /> : thisGameNFTs.length ?
              <div className='my-6 mx-16 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8'>
                {thisGameNFTs.map((NFT, i) => <ClipCard key={i} NFT={NFT} />)}
              </div> : <h1 className='text-center text-xl text-primary'>No NFTs found.</h1>}
          </div>
        </div>
      </div>
    </>
  )
}

const Sidebar = ({ gameId, clipsForSale }) => {
  switch (gameId) {
    case VALORANT_GAME_ID:
      return (
        <>
          <div className='my-3 rounded-lg bg-valorant mx-auto'>
            <Image
              className='cursor-pointer'
              src={valorantlogo}
              width={200}
              height={200}
            />
          </div>
          <h6 className='mt-3 text-gray-mute font-bold text-sm md:text-lg'>Description</h6>
          <p className='mb-3 text-primary text-2xs md:text-sm font-semibold'>{VALORANT_DESCRIPTION}</p>
          <h6 className='mt-3 text-gray-mute font-bold text-sm md:text-lg'>Clips For Sale</h6>
          <p className='mb-3 text-primary text-2xs md:text-sm font-semibold'>{clipsForSale}</p>
        </>
      )

    case CSGO_GAME_ID:
      return (
        <>
          <div className='my-3 rounded-lg bg-csgo'>
            <Image
              className='cursor-pointer'
              src={csgologo}
              width={210}
              height={150}
            />
          </div>
          <h6 className='mt-3 text-gray-mute font-bold text-sm md:text-lg'>Description</h6>
          <p className='mb-3 text-primary text-2xs md:text-sm font-semibold'>{CSGO_DESCRIPTION}</p>
          <h6 className='mt-3 text-gray-mute font-bold text-sm md:text-lg'>Clips For Sale</h6>
          <p className='mb-3 text-primary text-2xs md:text-sm font-semibold'>{clipsForSale}</p>
        </>
      )

    case FORTNITE_GAME_ID:
      return (
        <>
          <div className='my-3 rounded-lg bg-fortnite'>
            <Image
              className='cursor-pointer'
              src={fortnitelogo}
              width={240}
              height={160}
            />
          </div>
          <h6 className='mt-3 text-gray-mute font-bold text-sm md:text-lg'>Description</h6>
          <p className='mb-3 text-primary text-2xs md:text-sm font-semibold'>{FORTNITE_DESCRIPTION}</p>
          <h6 className='mt-3 text-gray-mute font-bold text-sm md:text-lg'>Clips For Sale</h6>
          <p className='mb-3 text-primary text-2xs md:text-sm font-semibold'>{clipsForSale}</p>
        </>
      )

    default:
      return null
  }
}