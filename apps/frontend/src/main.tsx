import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/app';
import * as sw from './sw';

import '@wkwkbudgetapp/global-styles';

const wkwkQueryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <QueryClientProvider client={wkwkQueryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

sw.register();
