// import jwt from 'jsonwebtoken';
// // Named export version
// export const generateToken = (userId) => { /*...*/ };
// export const generateRefreshToken = (userId) => { /*...*/ };

// // Or default export:
// // const generateToken = (userId) => { /*...*/ };
// // export default generateToken;

// /**
//  * Generate JWT token
//  * @param {string} userId - User ID to include in token
//  * @returns {string} - Signed JWT token
//  */
// const generateToken = (userId) => {
//   return jwt.sign(
//     { id: userId },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRE || '30d',
//       issuer: process.env.JWT_ISSUER || 'ecommerce-api',
//       audience: process.env.JWT_AUDIENCE || 'ecommerce-client'
//     }
//   );
// };

// /**
//  * Generate refresh token
//  * @param {string} userId - User ID to include in token
//  * @returns {string} - Signed refresh token
//  */
// const generateRefreshToken = (userId) => {
//   return jwt.sign(
//     { id: userId },
//     process.env.JWT_REFRESH_SECRET,
//     {
//       expiresIn: process.env.JWT_REFRESH_EXPIRE || '90d'
//     }
//   );
// };

// export { generateToken, generateRefreshToken };
import jwt from 'jsonwebtoken';

/**
 * Generate JWT token
 * @param {string} userId - User ID to include in token
 * @returns {string} - Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
      issuer: process.env.JWT_ISSUER || 'ecommerce-api',
      audience: process.env.JWT_AUDIENCE || 'ecommerce-client'
    }
  );
};

/**
 * Generate refresh token
 * @param {string} userId - User ID to include in token
 * @returns {string} - Signed refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '90d'
    }
  );
};

// Use either named exports (recommended):
export { generateToken, generateRefreshToken };

// OR default export (choose one, not both):
// export default generateToken;