import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * Get all documents from the model with applied query features.
 * @param {Object} Model - Mongoose model.
 * @returns {Function} - Express middleware function.
 */
export const getAll = Model =>
  catchAsync(async (req, res) => {
    // Initialize API features
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Execute query
    const docs = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs,
      },
    });
  });

/**
 * Get a single document by ID with optional population options.
 * @param {Object} Model - Mongoose model.
 * @param {Object} [popOptions] - Mongoose population options.
 * @returns {Function} - Express middleware function.
 */
export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    // Build query
    const query = Model.findById(req.params.id);
    if (popOptions) query.populate(popOptions);
    const doc = await query;

    // Handle document not found
    if (!doc) {
      return res.status(404).json({
        status: 'fail',
        message: 'No document found with that ID',
      });
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

/**
 * Create a new document in the model.
 * @param {Object} Model - Mongoose model.
 * @returns {Function} - Express middleware function.
 */
export const createOne = Model =>
  catchAsync(async (req, res) => {
    // Create document
    const doc = await Model.create(req.body);

    // Send response
    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

/**
 * Update a document by ID.
 * @param {Object} Model - Mongoose model.
 * @returns {Function} - Express middleware function.
 */
export const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    // Update document
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Handle document not found
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

/**
 * Delete a document by ID.
 * @param {Object} Model - Mongoose model.
 * @returns {Function} - Express middleware function.
 */
export const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    // Delete document
    const doc = await Model.findByIdAndDelete(req.params.id);

    // Handle document not found
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // Send response
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
