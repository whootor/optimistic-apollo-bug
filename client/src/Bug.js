import React, { Component } from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query {
    bug {
      id,
      name
    }
  }
`

const mutation = gql`
  mutation {
    fixBug {
      id,
      name
    }
  }
`

class Bug extends Component {
  onClick = () => {
    this.props.mutate({
      optimisticResponse: {
        __typeName: 'Mutation',
        fixBug: {
          ...this.props.data.bug,
          // __typeName: 'Bug',
          name: 'Optimistic Ledyba'
        }
      }
    })
  }

  render () {
    const { loading, bug, error } = this.props.data
    console.log('props', this.props.data)
    if (error) {
      return (<div>Ledying erroooor....</div>)
    }
    if (loading) {
      return (<div>Ledying buuuuug....</div>)
    }
    const { id, name } = bug
    return (
      <div>
        <span>{id}</span>&nbsp;
        <span>{name}</span>
        <button onClick={this.onClick}>Fix Bug</button>
      </div>
    )
  }
}

export default compose(
  graphql(query),
  graphql(mutation)
)(Bug)