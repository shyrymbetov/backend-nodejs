import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ErrorResponseBody } from '../shared/types/error-response-body.type';
import { HttpError } from 'http-errors';

export function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  console.error(err);
  const responseBody: ErrorResponseBody = {
    fail: true,
    error: 'InternalServerError',
    message: err.message,
    details: err.stack,
  };

  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .send({ ...responseBody, error: err.name, message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).send({
      ...responseBody,
      error: 'ValidationError',
      message: 'Invalid data in the request',
      details: JSON.parse(err.message),
    });
  }
  return res.status(500).send(responseBody);
}
