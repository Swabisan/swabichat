import { PrismaClient } from '@prisma/client'

export type Resolver<Args, Response> = (
  root: any,
  args: Args,
  context: { db: PrismaClient },
  info: any
) => Promise<Response>
