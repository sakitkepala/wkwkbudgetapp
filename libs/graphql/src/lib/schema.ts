// Ref implementasi schema loading: https://www.howtographql.com/graphql-js/3-a-simple-mutation/
import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';

import type { Resolvers } from './types/resolvers';

const typeDefs = readFileSync(
  join(__dirname, 'schemas/schema.graphql'),
  'utf8'
);

const resolvers: Resolvers = {
  Query: {
    hello: () => 'hai',
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
