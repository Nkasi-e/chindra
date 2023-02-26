import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  loginUser,
  getUserDetails,
} from '../services/auth.services';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body, res);
    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await loginUser(req.body, res);
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const details = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getUserDetails(req.user?.email as string);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
