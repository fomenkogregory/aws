import 'source-map-support/register';

import { Client } from 'pg'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { clientConfig } from "@libs/client-config";
import { Queries } from "@shared/queries";

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async () => {
  const client = new Client(clientConfig)

  try {
    await client.connect()
    const { rows: products } = await client.query(Queries.selectAll)

    return formatJSONResponse(products);
  } catch {
    console.table('KEK')
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductsList);
