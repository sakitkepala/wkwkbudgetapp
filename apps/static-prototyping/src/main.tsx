import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './app/global-styles.css';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('maribu-root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
