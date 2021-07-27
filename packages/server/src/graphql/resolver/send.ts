import { Message } from '@prisma/client'

import { Resolver } from './types'

export const send: Resolver<
  { to: string[]; from: string; body: string },
  Message
> = async (root, { to, from, body }, { db, pubsub }) => {
  const sent = await db.message
    .create({
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
    .then((sent) => {
      to.map((name: string) => {
        pubsub.publish(`to:${name}`, { onNewMessage: sent })
      })

      return sent
    })

  return sent
}
