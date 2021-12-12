import Head from 'next/head'
import Navbar from '../../components/Navbar'

export default function Explore() {
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='text-center mx-28'>
        <Head>
          <title>About | Recon</title>
          <meta name='description' content='NFT Marketplace for gamers' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1 className='mx-auto text-white text-4xl font-bold my-12'>About Us</h1>
        <h3 className='text-2xl text-white font-bold my-3'>Recon is a marketplace for gamers to buy and sell gameplay clips as NFTs.</h3>
        <h3 className='text-2xl italic text-primary my-3'>Treating gameplay like the art it is.</h3>
        <p className='text-lg text-white my-16'>
          There was a time when gaming was considered just a hobby, but times have changed.
          Gaming and video game content creation is a primary career for millions across the globe.
          With the exponential rise of the web3 revolution, its intersection with gaming was inevitable.
          We made it come to life with Recon.
          Recon is a platform for gamers and video game content creators to generate an extra stream of revenue by selling their gameplay content to their fans in the form of NFTs.
          Not just that, practically anyone with an awesome gameplay clip of theirs can list it on our platform for other gamers to buy.
          We believe that gaming is an art form and Recon is built around that same belief.
        </p>
        <h6 className='absolute bottom-10 left-0 right-0 my-2 text-white italic font-bold'>
          Made by <a href='https://twitter.com/thatshutterboi'>
            <span className='hover:text-primary underline text-white'>Aayush Mishra</span>
          </a> and <a href='https://twitter.com/mizanxali'>
            <span className='hover:text-primary underline text-white'>Mizan Ali</span>
          </a> as a part of Polygon BUIDL IT Hackathon.
        </h6>
      </div>
    </div>
  )
}