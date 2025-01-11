import { StrictMode } from 'react';
import '@mantine/core/styles.css';
import './styles.css';
import * as ReactDOM from 'react-dom/client';
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
      <div>App..</div>
    </MantineProvider>
  </StrictMode>
);
