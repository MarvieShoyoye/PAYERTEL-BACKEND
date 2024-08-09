export const generateTransactionID = () => {
  const prefix = 'GF-';
  const digits = 7;
  const randomDigits = Math.floor(Math.random() * Math.pow(10, digits))
    .toString()
    .padStart(digits, '0');
  return `${prefix}${randomDigits}`;
};

export default generateTransactionID;
