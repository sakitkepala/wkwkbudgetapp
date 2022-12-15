import { graphql } from 'msw';

const handlers = [
  graphql.query('Ping', (_, res, context) => {
    return res(
      context.data({
        ping: 'pong',
      })
    );
  }),
];

export { handlers, graphql };
