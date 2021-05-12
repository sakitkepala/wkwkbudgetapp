import { setupWorker } from "msw";
import { handlers } from "./server-handlers";

const server = setupWorker(...handlers);
server.start({
  serviceWorker: {
    url: "http://localhost:3000/mockServiceWorker.js",
  },
});

export * from "msw";
export { server };
