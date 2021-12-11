import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

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
        <h1 className='mx-auto my-4 text-white text-4xl font-bold'>About Us</h1>
      </div>
      <Footer />
    </>
  )
}