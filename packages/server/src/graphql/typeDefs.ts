import { ITypeDefinitions } from 'graphql-tools'

export const typeDefs: ITypeDefinitions = `
  scalar DateTime

  type User {
    id:        Int!
    name:      String!
    posts: [Message!]!
    messages: [Message!]!
  }

  type Message {
    id:         Int!
    createdAt:  DateTime!
    body:       String!
    author:     String!
    from:       User!
    to:         [User!]!
  }

  type Query {
    messages(to: [String!], from: String): [Message!]!
  }

  type Mutation {
    send(to: [String!]!, from: String!, body: String!): Message!
  }
`