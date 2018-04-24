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
import Deck from './Deck'

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: createHttpLink({ 
    uri: 'http://localhost:3030/graphql'
  }),
  cache
})

class App extends Component {
  state = {showDeck: false}

  render() {
    const {showDeck} = this.state
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Bug />
          <button onClick={() => this.setState({showDeck: !showDeck})}>Toggle Deck</button>
          {showDeck && <Deck />}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
