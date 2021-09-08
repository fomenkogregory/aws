import 'source-map-support/register';

import { Client } from "pg";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { clientConfig } from "@libs/client-config";
import { Queries } from "@shared/queries";
import { Logger } from "@shared/logger";

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  Logger.logEvent(event)
  const client = new Client(clientConfig)

  try {
    await client.connect()
    const { rows: product } = await client.query(Queries.selectById(event.pathParameters.id))

    return formatJSONResponse(product);
  } catch (error) {
    return formatJSONResponse(error, 500);
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductsList);
