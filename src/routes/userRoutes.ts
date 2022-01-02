import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// CREATE NEW ONE
router.post('/signup', userController.user_post);

// LOGIN EXISTING ONE
router.post('/login', userController.user_login);

// CHECK EXISTING ONE
router.post('/check', userController.user_check);

export default router;
