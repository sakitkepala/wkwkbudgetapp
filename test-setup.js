// Referensi "Global setup/teardown with nx libraries":
// https://nx.dev/packages/jest#global-setup/teardown-with-nx-libraries
const { registerTsProject } = require('nx/src/utils/register');
const cleanupRegisteredPaths = registerTsProject('.', 'tsconfig.base.json');
const { server } = require('@wkwkbudgetapp/tests');

// Nge-polyfill `fetch` di environment test-nya jest
// https://github.com/remix-run/react-router/issues/9508
// https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/__tests__/setup.ts
const { fetch, Request, Response } = require('@remix-run/web-fetch');

require('@testing-library/jest-dom');

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

// Referensi setup "global" MSW: https://mswjs.io/docs/getting-started/integrate/node
beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

cleanupRegisteredPaths();
