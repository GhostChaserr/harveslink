import { StrictMode } from 'react';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import './styles.css';
import * as ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { AppTheme } from 'design';
import client from './services/apollo.service';
import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import App from './app';
import { AddProductDrawer } from './global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider
        theme={Object.assign({}, AppTheme, {
          fontFamily: 'BPG WEB 001 Caps, sans-serif',
        })}
      >
        <AddProductDrawer />
        <App />
      </MantineProvider>
    </ApolloProvider>
  </StrictMode>
);
