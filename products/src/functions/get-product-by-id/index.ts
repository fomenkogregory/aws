import { handlerPath } from '@libs/handlerResolver';

export const getProductById = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}'
      }
    }
  ]
}
