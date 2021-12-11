import Head from 'next/head'
import Navbar from '../../components/Navbar'
import ExploreCard from '../../components/ExploreCard'
import { CSGO_GAME_ID, FORTNITE_GAME_ID, VALORANT_GAME_ID } from '../../constants'

export default function Explore() {
  return (
    <>
      <Navbar />
      <div className='text-center'>
        <Head>
          <title>Explore | Recon</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1 className='mx-auto my-4 text-white text-4xl font-bold'>Explore</h1>
        <div className='mx-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
          <ExploreCard gameId={VALORANT_GAME_ID} />
          <ExploreCard gameId={CSGO_GAME_ID} />
          <ExploreCard gameId={FORTNITE_GAME_ID} />
        </div>
      </div>
    </>
  )
}