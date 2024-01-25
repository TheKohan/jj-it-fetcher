import { Middleware, isHttpError } from 'oak';

export const errorHandler: Middleware = async ({ response }, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      response.status = err.status;
    } else {
      response.status = 500;
    }
    response.body = { error: err.message };
    response.type = 'json';
  }
};
