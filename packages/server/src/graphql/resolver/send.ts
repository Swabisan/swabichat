import { Resolver } from './types'

export const send: Resolver = async (
  root,
  { to, from, body }: { to: string[]; from: string; body: string },
  { db }
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
}
