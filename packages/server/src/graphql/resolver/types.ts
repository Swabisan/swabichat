import { PrismaClient } from "@prisma/client";

export type Resolver = (
  root: any,
  args: unknown,
  context: { db: PrismaClient},
  info: any
) => Promise<unknown>