import { Message } from '@prisma/client'

export const onNewMessage = {
  subscribe: (root, { to }, { pubsub }): AsyncIterator<string, Message> =>
    pubsub.asyncIterator(`to:${to}`)
}
