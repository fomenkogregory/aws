import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";
import { HttpError, StatusCode } from "@core/models";

type ValidatedAPIGatewayProxyEvent<S = never> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S = never> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown> | unknown[] | HttpError) => {
  if (response instanceof HttpError) {
    return {
      statusCode: response.statusCode,
      body: JSON.stringify({ message: response.message })
    }
  }

  return {
    statusCode: StatusCode.Ok,
    body: JSON.stringify(response)
  }
}
