import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import secureSession from '@fastify/secure-session';
import { createYoga } from 'graphql-yoga';
import {
  schema,
  createContext,
  FastifyServerContext,
  CustomContext,
} from '@wkwkbudgetapp/graphql';

import { readFileSync } from 'fs';
import { join, resolve } from 'path';

const loggerOptions = {
  test: false,
  production: true,
  local: {
    transport: { target: 'pino-pretty' },
  },
};

function buildServer() {
  const server: FastifyInstance = fastify({
    logger: loggerOptions['local'] ?? true,
  });

  server.register(cors);

  server.register(secureSession, {
    key: readFileSync(join(resolve('./'), 'secret-key')),
    cookieName: 'wkwkbudgetapp-auth',
    cookie: { httpOnly: true, sameSite: 'lax' },
  });

  const graphqlServer = createYoga<FastifyServerContext, CustomContext>({
    logging: {
      debug: (...args) => args.forEach((arg) => server.log.debug(arg)),
      info: (...args) => args.forEach((arg) => server.log.info(arg)),
      warn: (...args) => args.forEach((arg) => server.log.warn(arg)),
      error: (...args) => args.forEach((arg) => server.log.error(arg)),
    },
    schema,
    context: createContext,
  });

  server.route({
    url: '/graphql',
    method: ['POST', 'GET', 'OPTIONS'],
    handler: async (req, reply) => {
      const response = await graphqlServer.handleNodeRequest(req, {
        req,
        reply,
      });

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);
      reply.send(response.body);

      return reply;
    },
  });

  // This will allow Fastify to forward multipart requests to GraphQL Yoga
  server.addContentTypeParser('multipart/form-data', {}, (req, payload, done) =>
    done(null)
  );

  return server;
}

export { buildServer };
