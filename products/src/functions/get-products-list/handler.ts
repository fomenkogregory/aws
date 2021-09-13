import 'source-map-support/register';

import { Client } from 'pg'
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { clientConfig } from "@libs/client-config";
import { Queries } from "@shared/queries";
import { Logger } from "@shared/logger";
import { InternalServerError } from "@core/models";

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  Logger.logEvent(event)
  const client = new Client(clientConfig)

  try {
    await client.connect()
    const { rows: products } = await client.query(Queries.selectAll)

    return formatJSONResponse(products);
  } catch {
    return formatJSONResponse(new InternalServerError());
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductsList);
