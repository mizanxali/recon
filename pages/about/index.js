import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

export default function Explore() {
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='text-center'>
        <Head>
          <title>About | Recon</title>
          <meta name='description' content='NFT Marketplace for gamers' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1 className='mx-auto my-4 text-white text-4xl font-bold'>About Us</h1>
      </div>
    </div>
  )
}