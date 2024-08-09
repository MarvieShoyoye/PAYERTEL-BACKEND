import Purchase from '../models/datapurchasemodel.js';
import Bundle from '../models/databundlemodel.js';
import { purchaseDataBundle } from '../utils/vtuApi.js';
import { generateTransactionID } from '../utils/transactionId.js';
import UserModel from '../models/userModel.js';
import AppError from '../utils/appError.js';

// Handle purchase of a data bundle
export const purchaseBundle = async (req, res) => {
  const {
    userId,
    serviceProvider,
    code,
    amount,
    recipient,
    Package,
    bundleId,
  } = req.body;

  try {
    // Validate input
    if (
      !userId ||
      !serviceProvider ||
      !code ||
      !amount ||
      !recipient ||
      !Package ||
      !bundleId
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // validate user
    const user = await UserModel.findById(userId).populate('wallet');
    if (!user) {
      return next(AppError(404, 'User not found'));
    }

    // check if the user has enough money to buy the data bundle
    const wallet = user.wallet[0];
    if (!wallet || wallet.walletBalance < amount) {
      return next(AppError(400, 'Insufficient funds'));
    }

    // Check if bundle exists
    const bundle = await Bundle.findById(bundleId).populate('User');
    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    // Create purchase record
    const transactionId = generateTransactionID();
    const purchase = new Purchase({
      userId,
      serviceProvider,
      code,
      amount,
      recipient,
      Package,
      bundleId,
      Date: Date.now(),
      transactionId,
      status: 'completed',
    });

    await purchase.save();

    wallet.walletBalance -= amount;
    await wallet.save();

    user.transactions.push(transaction._id);
    await user.save();

    // // Interact with VTU API
    // const vtuResponse = await purchaseDataBundle(
    //   phoneNumber,
    //   bundle.dataAmount
    // );

    // if (vtuResponse.success) {
    //   // Update purchase status
    //   purchase.status = 'completed';
    //   await purchase.save();

    //   res
    //     .status(201)
    //     .json({ message: 'Purchase completed successfully', purchase });
    // } else {
    //   // Handle VTU API failure
    //   purchase.status = 'failed';
    //   await purchase.save();

    //   res
    //     .status(500)
    //     .json({ message: 'Purchase failed', error: vtuResponse.message });
    // }
  } catch (error) {
    res.status(500).json({ message: 'Error processing purchase', error });
  }
};
