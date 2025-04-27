import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { logger, morganStream } from './utils/logger.js';

import morgan from 'morgan';

// Import routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Import middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// 1. Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// 2. Cookie parser
app.use(cookieParser());

// 3. Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// 4. Security middleware
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(helmet()); // Set security headers
app.use(hpp()); // Prevent HTTP parameter pollution

// 5. Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// 6. HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev', { stream: morganStream }));
}

// 7. Mount routers
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);

// 8. Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 9. Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;