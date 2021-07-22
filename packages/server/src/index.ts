import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'

import { resolvers, typeDefs } from './graphql'

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db: new PrismaClient()
  }
})

server.start(
  {
    cors: {
      origin: ['http://localhost:3000']
    }
  },
  () => console.log('Server is running on http://localhost:4000')
)
