import { handlerPath } from '@libs/handlerResolver';
import { schema } from "./schema";

export const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
