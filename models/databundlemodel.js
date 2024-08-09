import mongoose from 'mongoose';

const bundleSchema = new mongoose.Schema(
  {
    serviceProvider: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    validity: {
      type: String,
      required: true,
    },
    bundleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bundle"
    }
  },
  {
    timestamps: true,
  }
);

const Bundle = mongoose.model('Bundle', bundleSchema);

export default Bundle;
