declare namespace NodeJS {
  export interface ProcessEnv {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    PG_HOST: string,
    PG_PORT: string,
    PG_DATABASE: string,
    PG_USERNAME: string,
    PG_PASSWORD: string,
  }
}
