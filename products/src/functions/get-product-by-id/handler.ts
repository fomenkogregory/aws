import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { Logger } from "@shared/logger";
import { BadRequestError, InternalServerError, NotFoundError, RegExpression } from '@core/models';
import { ProductsRepository } from "@shared/products-repository";
import { PgClient } from "@libs/pg-client";

const getProductById: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  Logger.logEvent(event)

  const { id } = event.pathParameters
  const client = new PgClient()
  const repository = new ProductsRepository(client)

  try {
    await client.connect()

    if (!RegExpression.uuid4.test(id)) {
      return formatJSONResponse(new BadRequestError('Incorrect id.'));
    }

    const product = await repository.findOne(id)

    if (!product) {
      return formatJSONResponse(new NotFoundError('Product', id));
    }

    return formatJSONResponse(product);
  } catch {
    return formatJSONResponse(new InternalServerError());
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductById);
