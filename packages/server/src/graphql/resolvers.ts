import { IResolvers } from 'graphql-tools'

import { messages, onNewMessage, send } from './resolver'

export const resolvers: IResolvers = {
  Query: {
    messages
  },
  Mutation: {
    send
  },
  Subscription: {
    onNewMessage
  }
}
