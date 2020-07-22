import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'

import { JWT_TOKEN_ITEM } from './context/authContext'

const httpLink = createHttpLink({
  // uri: 'http://localhost:5000',
  uri: 'https://immense-hamlet-51418.herokuapp.com/',
})

const authLink = setContext(() => {
  const token = localStorage.getItem(JWT_TOKEN_ITEM)
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
