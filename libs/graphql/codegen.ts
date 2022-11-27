// Contoh konfig resolver:
// https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga
import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/api/src/schemas/schema.graphql',
  generates: {
    'libs/graphql/src/lib/types/resolvers.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
