import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/apollo';

function Ecommerce({ Component, pageProps, categories }) {
  console.log("Inital state => ",pageProps.initialApolloState);
  const apolloClient = useApollo(pageProps.initialApolloState);
  console.log(apolloClient);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout categories={categories}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce