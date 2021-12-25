require('dotenv').config();
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const user_post = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const user_login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) {
      res.status(400).json({ message: 'Cannot find user' });
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      const userForJwt = { username: user.username };
      const accessToken = jwt.sign(
        userForJwt,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(400).json({ message: 'Wrong password' });
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  user_post,
  user_login,
};
