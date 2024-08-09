import Bundle from '../models/databundlemodel.js';

// Get all bundles
export const getAllBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find({});
    res.status(200).json(bundles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bundles', error });
  }
};

// Get a bundle by ID
export const getBundleById = async (req, res) => {
  try {
    const bundle = await Bundle.findById(req.params.id);

    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    res.status(200).json(bundle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bundle', error });
  }
};
