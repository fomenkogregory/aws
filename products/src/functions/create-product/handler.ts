import 'source-map-support/register';

import { Client } from "pg";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { clientConfig } from "@libs/client-config";
import { schema } from "./schema";
import { Queries } from "@shared/queries";
import { Logger } from "@shared/logger";

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  Logger.logEvent(event)
  const client = new Client(clientConfig)

  try {
    await client.connect()
    const { rows: products } = await client.query(Queries.create(event.body))

    return formatJSONResponse(products[0]);
  } catch (error) {
    return formatJSONResponse(error, 500);
  } finally {
    await client.end()
  }
}

export const main = middyfy(createProduct);
