import express from 'express';
import {
  getMe,
  updateMe,
  deleteMe,
  getUser,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/protect.js';

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
