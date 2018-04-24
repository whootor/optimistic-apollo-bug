import React, { Component } from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query {
    bug {
      id,
      name,
      image
    }
  }
`

class Deck extends Component {
  render () {
    const { loading, bug, error } = this.props.data
    
    if (error) {
      return (<div>Deeeck erroooor....</div>)
    }
    if (loading) {
      return (<div>Deeck loading....</div>)
    }
    const { id, name, image } = bug
    return (
      <div>
        <span>{id}</span>&nbsp;
        <span>{name}</span>
        <img src={image} />
      </div>
    )
  }
}

export default compose(
  graphql(query)
)(Deck)