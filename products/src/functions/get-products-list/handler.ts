import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { PgClient } from "@libs/pg-client";
import { Logger } from "@shared/logger";
import { InternalServerError } from "@core/models";
import { ProductsRepository } from "@shared/products-repository";

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  Logger.logEvent(event)

  const client = new PgClient()
  const repository = new ProductsRepository(client)

  try {
    await client.connect()
    const products = await repository.find()

    return formatJSONResponse(products);
  } catch {
    return formatJSONResponse(new InternalServerError());
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductsList);
