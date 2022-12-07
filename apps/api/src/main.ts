import { buildServer } from './app';

const PORT = 7654;
const app = buildServer();

async function start() {
  try {
    await app.listen({ port: PORT });
    console.info(`GraphQL jalan di http://localhost:${PORT}/graphql`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
