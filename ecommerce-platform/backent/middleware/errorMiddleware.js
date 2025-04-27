// Not Found middleware
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Forward to error handler
  };
  
  // General Error handler
  const errorHandler = (err, req, res, next) => {
    // Set default status code
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    // Handle specific MongoDB errors
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404;
      message = 'Resource not found (invalid ID format)';
    }
  
    // Handle validation errors
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(err.errors)
        .map((val) => val.message)
        .join(', ');
    }
  
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Invalid token';
    }
  
    if (err.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token expired';
    }
  
    // Development vs Production error details
    const errorResponse = {
      message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    };
  
    res.status(statusCode).json(errorResponse);
  };
  
  // Rate limiting middleware
  const rateLimiter = (req, res, next) => {
    // Implement your rate limiting logic here
    // Example: Using express-rate-limit
    next();
  };
  
  export { notFound, errorHandler, rateLimiter };