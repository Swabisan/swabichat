import { PrismaClient } from '@prisma/client'

export type Resolver<Args, Response> = (
  root: unknown,
  args: Args,
  context: { db: PrismaClient },
  info: unknown
) => Promise<Response>
