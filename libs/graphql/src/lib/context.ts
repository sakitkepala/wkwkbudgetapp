import { PrismaClient } from '@prisma/client';
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { Session } from '@fastify/secure-session';
import type { YogaInitialContext } from 'graphql-yoga';

declare module 'fastify' {
  interface FastifyRequest {
    session: Session;
  }
}

export type FastifyServerContext = {
  req: FastifyRequest;
  reply: FastifyReply;
};

export type CustomContext = {
  prisma: PrismaClient;
  currentUser: CurrentUser;
};

export type GraphQLContext = FastifyServerContext & CustomContext;

const prisma = new PrismaClient();

async function createContext(
  initialContext: YogaInitialContext & FastifyServerContext
): Promise<CustomContext> {
  const currentUser = await authenticateUser(initialContext.req);
  return { prisma, currentUser };
}

export type CurrentUser = null | {
  id: number;
};

async function authenticateUser(req: FastifyRequest): Promise<CurrentUser> {
  const userId = req.session.get('userId');
  if (!userId) {
    return null;
  }
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return null;
  }
  return { id: user.id };
}

export { createContext };
