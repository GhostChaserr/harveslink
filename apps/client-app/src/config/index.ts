interface Config {
  ENVIRONMENT: string;
  API_URL: string;
}

const config: Config = {
  ENVIRONMENT: import.meta.env.VITE_ENV,
  API_URL: 'http://localhost:5400',
};

switch (import.meta.env.VITE_ENV) {
  case 'production':
    config.API_URL = 'https://king-prawn-app-p323h.ondigitalocean.app';
    config.ENVIRONMENT = 'production';
    break;

  default:
    config.API_URL = 'http://localhost:5400';
    config.ENVIRONMENT = 'local';
}

export default config;
