import gql from 'graphql-tag'

export const GET_ALL_PRODUCTS = gql`
  query {
    countries {
        code
        name
    }
  }
`