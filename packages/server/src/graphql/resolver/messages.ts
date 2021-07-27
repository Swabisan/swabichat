import { Message } from '@prisma/client'

import { Resolver } from './types'

export const messages: Resolver<{ to?: string[]; from?: string }, Message[]> =
  async (root, { to, from }, { db }) => {
    const messages = await db.message.findMany({
      where: {
        OR: [
          {
            author: from == null ? undefined : from
          },
          {
            to:
              to == null
                ? undefined
                : { some: { OR: to.map((name: string) => ({ name })) } }
          }
        ]
      },
      include: { from: true, to: true }
    })

    return messages
  }
