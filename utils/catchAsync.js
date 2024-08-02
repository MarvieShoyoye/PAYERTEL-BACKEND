/**
 * A utility function to catch errors in async functions and pass them to the next middleware.
 * @param {Function} fn - The async function to wrap.
 * @returns {Function} - The wrapped function.
 */
const catchAsync = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};

export default catchAsync;
