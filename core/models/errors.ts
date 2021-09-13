import { StatusCode } from "./status-code";

export class HttpError extends Error {
  constructor(message, public statusCode: StatusCode) {
    super(message);
  }
}

export class NotFoundError extends HttpError {
  constructor(item: string, id: string) {
    super(`${item} with id '${id}' not found.`, StatusCode.NotFound);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, StatusCode.BadRequest);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super('Internal server error', StatusCode.InternalServerError);
  }
}