import { Request, Response, NextFunction } from 'express';
import { createProfile } from '../services/profile.services';

export const registerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await createProfile(
      req.body,
      req.user?.userId as string,
      res
    );
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
};
