import 'source-map-support/register';

import { Client } from "pg";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { clientConfig } from "@libs/client-config";
import { Queries } from "@shared/queries";
import { Logger } from "@shared/logger";
import { BadRequestError, InternalServerError, NotFoundError, RegExpression } from '@core/models';

const getProductById: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  Logger.logEvent(event)

  const client = new Client(clientConfig)
  const { id } = event.pathParameters

  try {
    await client.connect()

    if (!RegExpression.uuid4.test(id)) {
      return formatJSONResponse(new BadRequestError('Incorrect id.'));
    }

    const { rows: product } = await client.query(Queries.selectById(id))

    if (!product[0]) {
      return formatJSONResponse(new NotFoundError('Product', id));
    }

    return formatJSONResponse(product[0]);
  } catch {
    return formatJSONResponse(new InternalServerError());
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductById);
