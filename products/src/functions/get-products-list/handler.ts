import 'source-map-support/register';

import { Client } from 'pg'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { clientConfig } from "@libs/client-config";
import { SELECT_PRODUCTS_WITH_STOCKS } from "@shared/queries";

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async () => {
  const client = new Client(clientConfig)

  try {
    await client.connect()
    const { rows: products } = await client.query(SELECT_PRODUCTS_WITH_STOCKS)
    return formatJSONResponse(products);
  } catch {
    console.table('KEK')
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductsList);
