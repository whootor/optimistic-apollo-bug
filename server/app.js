const { graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const gql = require('graphql-tag')
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')

const def = gql`
  type Query {
    bug:Bug
  }
  type Mutation {
    fixBug:Bug
  }
  type Bug { 
    id: ID
    name: String
  }
  schema {
    query: Query
    mutation: Mutation
  }
`

const app = express()

app.use(cors())

const schema = makeExecutableSchema({
  typeDefs: [def],
  resolvers: {
    Mutation: {
      fixBug: async (_, query) => {
        return await new Promise((resolve) => {
          setTimeout(() => resolve({
            id: '2039t0923t0923tj0',
            name: 'Fixed Ledyba'
          }), 1000)
        })
      }
    },
    Query: {
      bug: (_, query) => {
        return {
          id: '2039t0923t0923tj0',
          name: 'Broken Ledyba'
        }
      }
    },
    // Bug: {
    //   id: (bug) => bug.id,
    //   name: (bug) => bug.name
    // }
  }
})

app.use('/graphql', bodyparser.json(), graphqlExpress((req, res) => ({
  schema
})))

app.listen(3030)