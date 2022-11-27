import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { createYoga, createSchema } from 'graphql-yoga';

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: async () => 'hai',
    },
  },
});

function buildServer() {
  const server: FastifyInstance = fastify({ logger: true });
  server.register(cors);

  const graphqlServer = createYoga({
    logging: {
      debug: (...args) => args.forEach((arg) => server.log.debug(arg)),
      info: (...args) => args.forEach((arg) => server.log.info(arg)),
      warn: (...args) => args.forEach((arg) => server.log.warn(arg)),
      error: (...args) => args.forEach((arg) => server.log.error(arg)),
    },
    schema,
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
