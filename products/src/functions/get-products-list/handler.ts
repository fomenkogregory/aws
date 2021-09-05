import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { PRODUCTS_MOCK } from "@mocks/products";

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async () => {
  return formatJSONResponse({ result: PRODUCTS_MOCK });
}

export const main = middyfy(getProductsList);
