import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { PRODUCTS_MOCK } from "@mocks/products";

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async (event) => {
  const { id } = event.pathParameters
  const product = PRODUCTS_MOCK.find(item => item.id === id) ?? { error: `No product with id "${id}"` }

  return formatJSONResponse(product);
}

export const main = middyfy(getProductsList);
