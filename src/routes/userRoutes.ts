import express, { Request, Response, NextFunction } from 'express';
import userController from '../controllers/userController';
import User from '../models/user';
import { IUser } from '../constants/types';

const router = express.Router();

// GET ONE
// router.get('/:id');

// CREATE NEW ONE
router.post('/', userController.user_post);

// LOGIN EXISTING ONE
router.post('/login', userController.user_login);

export default router;
