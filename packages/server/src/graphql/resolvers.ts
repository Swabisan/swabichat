import { IResolvers } from 'graphql-tools'

import { messages, newMessages, send } from './resolver'

export const resolvers: IResolvers = {
  Query: {
    messages
  },
  Mutation: {
    send
  },
  Subscription: {
    newMessages
  }
}
