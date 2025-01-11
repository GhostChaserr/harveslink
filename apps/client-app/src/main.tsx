import { StrictMode } from 'react';
import '@mantine/core/styles.css';
import './styles.css';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { MantineProvider } from '@mantine/core';
import { AppTheme } from 'design';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <MantineProvider
      theme={Object.assign({}, AppTheme, {
        fontFamily: 'BPG WEB 001 Caps, sans-serif',
      })}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
