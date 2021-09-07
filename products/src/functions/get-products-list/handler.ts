import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Client, ClientConfig } from 'pg'

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,
} = process.env

const clientConfig: ClientConfig = {
  host: PG_HOST,
  port: +PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}

const SELECT_PRODUCTS_WITH_STOCKS = 'SELECT id, title, description, price, count FROM products p LEFT JOIN stocks s ON p.id = s.product_id'

const getProductsList: ValidatedEventAPIGatewayProxyEvent = async () => {
  const client = new Client(clientConfig)

  try {
    await client.connect()
    const { rows: products } = await client.query(SELECT_PRODUCTS_WITH_STOCKS)
    return formatJSONResponse(products);
  } catch {
    console.table('KEK')
  } finally {
    await client.end()
  }
}

export const main = middyfy(getProductsList);
