import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { schema } from "./schema";
import { Logger } from "@shared/logger";
import { InternalServerError } from "@core/models";
import { ProductsRepository } from "@shared/products-repository";
import { PgClient } from "@libs/pg-client";

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  Logger.logEvent(event)

  const client = new PgClient()
  const repository = new ProductsRepository(client)

  try {
    await client.connect()
    const product = await repository.create(event.body)

    return formatJSONResponse(product);
  } catch {
    return formatJSONResponse(new InternalServerError());
  } finally {
    await client.end()
  }
}

export const main = middyfy(createProduct);
