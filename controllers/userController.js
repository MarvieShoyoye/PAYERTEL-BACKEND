import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import filterObj from '../utils/filterObject.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

export const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'No User was found with that ID',
    });
  }

  res.status(200).json({
    status: 'success',
    token: req.token,
    data: {
      user,
    },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword route.',
        400,
      ),
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const userDetails = filterObj(req.body, 'name', 'email', 'phone');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, userDetails, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Perfoming CRUD operations on user data (Only for Admins)
export const getUser = getOne(User);
export const createUser = createOne(User);
export const getAllUsers = getAll(User);
export const updateUser = updateOne(User); // Do NOT update passwords with this!
export const deleteUser = deleteOne(User);
