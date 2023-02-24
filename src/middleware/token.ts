import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const options: any = {
  expiresIn: process.env.EXPIRES_IN_MINUTES,
  algorithm: process.env.ALGORITHM,
};

const secret: any = process.env.JWT_SECRET_KEY;

const generateToken = (user: object) => {
  const token = jwt.sign(user, secret, options);
  return token;
};

export default generateToken;
