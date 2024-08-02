/**
 * Filters out unwanted fields from an object based on allowed fields.
 *
 * @param {Object} obj - The object to filter.
 * @param {...string} allowedFields - Fields that should be included in the returned object.
 * @returns {Object} - A new object containing only the allowed fields.
 */
const filterObj = (obj, ...allowedFields) => {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('First argument must be an object');
  }

  const newObj = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (allowedFields.includes(key)) {
      newObj[key] = value;
    }
  });

  return newObj;
};

export default filterObj;
