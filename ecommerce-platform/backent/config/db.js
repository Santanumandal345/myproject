// import mongoose from 'mongoose';
// import colors from 'colors';
// import { logger } from '../utils/logger.js';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // useCreateIndex: true,  // Not needed in Mongoose 6+
//       // useFindAndModify: false // Not needed in Mongoose 6+
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    
//     // Event listeners for connection
//     conn.connection.on('connected', () => {
//       console.log('Mongoose connected to DB'.green);
//     });

//     conn.connection.on('error', (err) => {
//       console.log(`Mongoose connection error: ${err.message}`.red);
//     });

//     conn.connection.on('disconnected', () => {
//       console.log('Mongoose disconnected'.yellow);
//     });

//     // Close connection on app termination
//     process.on('SIGINT', async () => {
//       await conn.connection.close();
//       console.log('Mongoose connection closed through app termination'.red);
//       process.exit(0);
//     });

//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.bold);
//     process.exit(1); // Exit with failure
//   }
// };

// export default connectDB;
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    logger.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;