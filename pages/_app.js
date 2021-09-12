import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import Script from 'next/script'

function Ecommerce({ Component, pageProps, categories }) {
  return (
      <Layout categories={categories}>
        <Script strategy="afterInteractive" src="https://widget.cloudinary.com/v2.0/global/all.js" />
        <Component {...pageProps} />
      </Layout>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce