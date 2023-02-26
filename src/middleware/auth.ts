import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorResponse } from './errorResponse';

dotenv.config();

const secret: any = process.env.JWT_SECRET_KEY;
const options: any = {
  algorithm: process.env.ALGORITHM,
};

interface User {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
      token?: string;
    }
  }
}

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization || req.headers['x-access-token'];

  if (!token || !token.startsWith('Bearer ')) {
    return errorResponse(res, 401, 'Not authorized');
  }

  const accessToken = token.split(' ')[1];
  try {
    const payload: any = jwt.verify(accessToken, secret, options);
    const { userId, email } = payload as User;
    const user: User = { userId, email };

    req.user = user;
    req.token = accessToken;

    next();
  } catch (error) {
    return errorResponse(res, 401, 'Unauthorized access');
  }
};

export default authentication;
