import { Resolver } from './types'

export const messages: Resolver = async (
  root,
  { to, from }: {to?: string[], from?: string},
  { db }
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