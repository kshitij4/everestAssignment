class ApiToastError extends Error {
    constructor(statusCode, toastError, isOperational = true, stack = '') {
        super(toastError);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.toastError = toastError;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiToastError;
