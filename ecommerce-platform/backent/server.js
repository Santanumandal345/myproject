// import app from './app.js';
// import connectDB from './config/db.js';
// // If using named exports (Option 1):
// import { logger } from './utils/logger.js';

// // If using default export (Option 2):
// // import logger from './utils/logger.js';; // This now works correctly
// import cluster from 'cluster';
// import os from 'os';

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   logger.error(`UNCAUGHT EXCEPTION! 💥 Shutting down...\n${err.name}: ${err.message}`);
//   process.exit(1);
// });

// const PORT = process.env.PORT || 5000;
// const NODE_ENV = process.env.NODE_ENV || 'development';
// const numCPUs = os.cpus().length;

// // Cluster mode for production
// if (cluster.isPrimary && NODE_ENV === 'production') {
//   logger.info(`Master ${process.pid} is running`);

//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker) => {
//     logger.error(`Worker ${worker.process.pid} died`);
//     cluster.fork(); // Create a new worker
//   });
// } else {
//   // Start server
//   const server = app.listen(PORT, async () => {
//     await connectDB();
//     logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold);
//     logger.info(`Worker ${process.pid} started`);
//   });

//   // Handle unhandled promise rejections
//   process.on('unhandledRejection', (err) => {
//     logger.error(`UNHANDLED REJECTION! 💥 Shutting down...\n${err.name}: ${err.message}`);
//     server.close(() => {
//       process.exit(1);
//     });
//   });

//   // Graceful shutdown
//   process.on('SIGTERM', () => {
//     logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
//     server.close(() => {
//       logger.info('💥 Process terminated!');
//       process.exit(0);
//     });
//   });
// }
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app.js';
import { logger } from './utils/logger.js';

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('MongoDB connected successfully'))
  .catch(err => {
    logger.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Error Handlers
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated!');
    process.exit(0);
  });
});