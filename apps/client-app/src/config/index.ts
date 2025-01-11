interface Config {
  ENVIRONMENT: string;
  API_URL: string;
  NX_GA_ID: string;
}

const config: Config = {
  ENVIRONMENT: process.env['NX_APP_ENV'] as string,
  API_URL: process.env['NX_API_URL'] as string,
  NX_GA_ID: process.env['NX_GA_ID'] as string
};


export default config;
