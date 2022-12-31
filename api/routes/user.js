import express from 'express';
const router = express.Router();
import verifyToken from '../verifyToken.js';
import userController from '../controllers/user.js';

// Get all users
router.get('/users', verifyToken, userController.getAll);

// Get a single user
// router.get('/user', verifyToken, userController.getUser);
router.get('/:userId', verifyToken, userController.getUser);

// Update a user
router.put('/:userId', verifyToken, userController.updateUser);

// Delete a user
router.delete('/:userId', verifyToken, userController.deleteUser);

export default router;
