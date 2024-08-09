import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Assuming you have a User model
    },
    serviceProvider: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      default: Date.now,
    },
    bundleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bundle',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
