import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Navbar from '../../components/common/Navbar'
import valorantlogo from '../../public/valorant-logo.svg'
import csgologo from '../../public/csgo-logo.png'
import fortnitelogo from '../../public/fortnite-logo.jpg'
import { VALORANT_DESCRIPTION } from '../../constants'
import ClipCard from '../../components/explore/ClipCard'

export default function Game() {
  const router = useRouter()
  const { game } = router.query
  console.log(game);

  //   <Head>
  //   <title>{game} | Recon</title>
  //   <meta name='description' content='Generated by create next app' />
  //   <link rel='icon' href='/favicon.ico' />
  // </Head>

  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      <Navbar />
      <div className='flex flex-row text-center overflow-hidden'>
        <div className='w-1/5 flex flex-col items-start text-left border-r-2 border-gray-light px-6 pt-4'>
          <div className='my-3 rounded-lg bg-valorant'>
            <Image
              className='cursor-pointer'
              src={valorantlogo}
              width={180}
              height={180}
            />
          </div>
          <h6 className='mt-3 text-gray-mute font-semibold text-lg'>Description</h6>
          <p className='mb-3 text-primary text-sm'>{VALORANT_DESCRIPTION}</p>
          <h6 className='mt-3 text-gray-mute font-semibold text-lg'>Clips Minted</h6>
          <p className='mb-3 text-primary text-sm'>45K</p>
          <h6 className='mt-3 text-gray-mute font-semibold text-lg'>Clips Sold</h6>
          <p className='mb-3 text-primary text-sm'>29K</p>
          <h6 className='mt-3 text-gray-mute font-semibold text-lg'>Creators</h6>
          <p className='mb-3 text-primary text-sm'>8.4K</p>
        </div>
        <div className='w-4/5 px-6 pt-4 overflow-y-scroll'>
          <div className='flex flex-row w-full justify-between'>
            <input type='text' className='w-1/3 rounded-lg text-primary bg-gray-light border-2 border-gray-light px-4 py-1 focus:outline-none focus:border-2 focus:border-primary' placeholder='Search for tags, clips, creators...' />
            <div>
              <button className='px-12 mr-2 py-2 bg-gray-light text-primary rounded-lg'>Filter</button>
              <button className='px-12 ml-2 py-2 bg-gray-light text-primary rounded-lg'>Sort</button>
            </div>
          </div>
          <div className='my-6 mx-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
            <ClipCard />
          </div>
        </div>
      </div>
    </div>
  )
}