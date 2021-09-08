import 'source-map-support/register';

import { Client } from "pg";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { clientConfig } from "@libs/client-config";
import { SELECT_PRODUCTS_WITH_STOCKS_BY_ID } from "@shared/queries";

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const { id } = event.pathParameters
  const client = new Client(clientConfig)

  try {
    await client.connect()
    const { rows: product } = await client.query(SELECT_PRODUCTS_WITH_STOCKS_BY_ID(id))
    return formatJSONResponse(product);
  } catch {
    console.table('KEK')
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductsList);
