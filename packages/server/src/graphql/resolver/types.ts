import { PubSub } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'

export type Resolver<Args, Response> = (
  root: unknown,
  args: Args,
  context: { db: PrismaClient; pubsub: PubSub },
  info: unknown
) => Promise<Response>
