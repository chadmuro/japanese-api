import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// CREATE NEW ONE
router.post('/', userController.user_post);

// LOGIN EXISTING ONE
router.post('/login', userController.user_login);

export default router;
