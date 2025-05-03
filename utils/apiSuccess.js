import { response } from 'express';

response.sendSuccess = function (statusCode, message, data = null) {
  this.status(statusCode).json({
    status:'success',
    statusCode,
    message,
    data,
  });
};
