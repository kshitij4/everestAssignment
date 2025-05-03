import ApiError from '../utils/apiError.js';
import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';

const errorHandler = (err, req, res, next) => {

  let { statusCode = 500, message } = err;

  // logger.error(err.stack);

  if (err instanceof UniqueConstraintError) {
    statusCode = 409;
    message = err.errors.map(e => e.message).join(', ');
  } else if (err instanceof ValidationError) {
    message = err.errors.map(e => e.message).join(', ');
  } else if (err instanceof ForeignKeyConstraintError) {
    message = 'Invalid foreign key reference';
  } else if (err instanceof ApiError) {
    statusCode = statusCode || 500;
    message = message || 'Internal Server Error';
  } else {
    statusCode = 500;
    message = process.env.NODE_ENV === 'development' ? message : 'Internal Server Error';
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;
