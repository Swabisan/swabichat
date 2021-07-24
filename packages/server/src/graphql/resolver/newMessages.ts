import { Message } from '@prisma/client'

import { Resolver } from './types'

export const newMessages: Resolver<
  { to: string },
  AsyncIterator<string>
> = async (root, { to }, { pubsub }) => pubsub.asyncIterator(`to:${to}`)
