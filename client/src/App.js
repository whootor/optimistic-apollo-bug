import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
} from 'apollo-cache-inmemory'

import Bug from './Bug'

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: createHttpLink({ 
    uri: 'http://localhost:3030/graphql'
  }),
  cache
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Bug />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
