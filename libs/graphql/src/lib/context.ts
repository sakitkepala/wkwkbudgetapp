import { PrismaClient } from '@prisma/client';
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { YogaInitialContext } from 'graphql-yoga';

const prisma = new PrismaClient();

export type FastifyServerContext = { req: FastifyRequest; reply: FastifyReply };

export type CustomContext = { prisma: PrismaClient; currentUser: CurrentUser };

export type GraphQLContext = FastifyServerContext & CustomContext;

async function createContext(
  initialContext: YogaInitialContext & FastifyServerContext
): Promise<CustomContext> {
  const currentUser = await authenticateUser(initialContext.req);
  return {
    prisma,
    currentUser,
  };
}

export type CurrentUser = null | {
  id: number;
};

async function authenticateUser(req: FastifyRequest): Promise<CurrentUser> {
  // TODO: ambil token/info auth dari session di request & di database.
  // Implemen session dulu di request Fastify biar bisa diakses kaya gini kurleb:
  // req.session.token // misalnya. untuk dekrip & ambil data email & pass
  // prisma.user.findUnique({where: {id: getIdFromToken(token)}})

  return null;
}

export { createContext };
