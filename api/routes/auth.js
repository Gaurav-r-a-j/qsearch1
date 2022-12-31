import express from 'express';
import authController from '../controllers/auth.js';
import verifyToken from '../verifyToken.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google', authController.googleAuth);
router.get('/user',verifyToken, authController.authUser);

export default router;
