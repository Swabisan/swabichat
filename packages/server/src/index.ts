import { GraphQLServer } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'

const typeDefs = `

  scalar DateTime

  type User {
    id:        Int
    name:      String
    posts: [Message]
    messages: [Message]
  }

  type Message {
    id:         Int
    createdAt:  DateTime
    body:       String
    author:     String
    from:       User
    to:         [User]
  }

  type Query {
    hello: String!
    messages(to: [String!], from: String): [Message!]!
  }

  type Mutation {
    send(to: [String!]!, from: String!, body: String!): Message!
    delete: Int!
  }
`

const server = new GraphQLServer({
  typeDefs,
  resolvers: {
    Query: {
      messages: async (
        root,
        { to, from },
        { db }: { db: PrismaClient },
        info
      ) => {
        const messages = await db.message.findMany({
          where: {
            author: from == null ? undefined : from,
            to:
              to == null
                ? undefined
                : { some: { OR: to.map((name: string) => ({ name })) } }
          },
          include: { from: true, to: true }
        })

        return messages
      }
    },
    Mutation: {
      send: async (
        root,
        { to, from, body },
        { db }: { db: PrismaClient },
        info
      ) => {
        const sent = await db.message.create({
          data: {
            to: {
              connectOrCreate: to.map((name: string) => ({
                where: { name },
                create: { name }
              }))
            },
            from: {
              connectOrCreate: {
                where: { name: from },
                create: { name: from }
              }
            },
            body
          },
          include: { from: true, to: true }
        })

        return sent
      },
      delete: async (root, args, { db }: { db: PrismaClient }, info) => {
        const deleted = await db.message.deleteMany()

        return deleted.count
      }
    }
  },
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
