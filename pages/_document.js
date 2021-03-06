import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link
            rel="stylesheet"
            href="https://video-react.github.io/assets/video-react.css"
          />
        </Head>
        <body className='bg-gradient-to-b from-black to-gray font-montserrat'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument