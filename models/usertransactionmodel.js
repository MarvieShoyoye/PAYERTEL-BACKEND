import mongoose from 'mongoose';

// Base schema options
const baseOptions = {
  discriminatorKey: 'transactionType', // Field to store transaction type
  collection: 'transactions', // Collection name
};

// Base transaction schema
const transactionSchema = new mongoose.Schema(
  {
    transactionID: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  baseOptions
);

// Base transaction model
const TransactionModel = mongoose.model('Transaction', transactionSchema);

// Credit transaction schema
const userCreditSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
  },
});

// Credit transaction model
const UserCredit = TransactionModel.discriminator(
  'UserCredit',
  userCreditSchema
);

// Data bundle transaction schema
const dataBundleSchema = new mongoose.Schema({
  serviceProvider: {
    type: String,
    required: true,
  },
  pacakage: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// Data bundle transaction model
const DataBundle = TransactionModel.discriminator(
  'DataBundle',
  dataBundleSchema
);

// Airtime bundle transaction schema
// const airtimeBundleSchema = new mongoose.Schema({
//   serviceProvider: {
//     type: String,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
// });

// // Airtime bundle transaction model
// const AirtimeBundle = TransactionModel.discriminator(
//   'AirtimeBundle',
//   airtimeBundleSchema
// );

export { TransactionModel, UserCredit, DataBundle, AirtimeBundle };
