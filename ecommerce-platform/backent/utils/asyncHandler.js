

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch((err) => {
//     console.error(`AsyncHandler Error: ${err.message}`.red);
//     next(err);
//   });
// };

export default asyncHandler;