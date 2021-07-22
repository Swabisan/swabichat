import { IResolvers } from 'graphql-tools'

import { messages, send } from "./resolver"

export const resolvers: IResolvers = {
  Query: {
    messages
  },
  Mutation: {
    send
  }
}
