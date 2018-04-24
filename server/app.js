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
    image: String
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
            name: 'Fixed Ledyba',
            image: 'https://pre00.deviantart.net/3d64/th/pre/f/2016/054/5/9/165_by_tamtamdi-d9swwpn.jpg'
          }), 1000)
        })
      }
    },
    Query: {
      bug: async (_, query) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return {
          id: '2039t0923t0923tj0',
          name: 'Broken Ledyba',
          image: 'http://static.pokemonpets.com/images/monsters-images-300-300/2165-Shiny-Ledyba.png'
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