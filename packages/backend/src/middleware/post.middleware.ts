import { ErrorMiddleware, Middleware } from '../types/middleware';

export class GenericError extends Error {
  status?: number;
}

const _notFoundHandler: Middleware = (_, res) => {
  res.status(404).json({
    message: 'Not Found',
    data: {},
  });
};

const _errorHandler: ErrorMiddleware = (err: GenericError, _, res) => {
  let status = err.status || 500;
  let message = err.message;
  console.log(`[ERR]: `, { message, stack: err.stack });

  res.status(status).json({
    message,
    data: {},
  });
};

export const postMiddleware = (): Array<Middleware | ErrorMiddleware> => {
  const middlewares: Array<Middleware | ErrorMiddleware> = [];
  middlewares.push(_errorHandler);
  middlewares.push(_notFoundHandler);
  return middlewares;
};
