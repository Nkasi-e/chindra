import * as argon from 'argon2';
import { RegisteredUser } from '../models';
import prisma from '../../prisma/prisma-client';
import { Response } from 'express';
import EntryValidator from '../utils/validator';
import { errorResponse } from '../middleware';
import generateToken from '../middleware/token';

const checkEmailExists = async (email: string, res: Response) => {
  const existingUserEmail = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (existingUserEmail) {
    return errorResponse(res, 409, 'This email already exists', 'email');
  }
};

export const createUser = async (
  input: RegisteredUser,
  res: Response
): Promise<any> => {
  const { email, password } = input;
  const { error } = EntryValidator.validateSignup(input);
  if (error) {
    const errorField = error.details[0].context.key;
    const errorMessage = error.details[0].message;
    return errorResponse(res, 400, errorMessage, errorField);
  }
  await checkEmailExists(email, res);
  const hashedPassword = await argon.hash(password);

  const user = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      created_at: true,
    },
  });
  const token = generateToken({ id: user.id, email: user.email });
  return {
    ...user,
    token,
  };
};

export const loginUser = async (input: RegisteredUser, res: Response) => {
  const { email, password } = input;
  const { error } = EntryValidator.validateLogin(input);
  if (error) {
    const errorField = error.details[0].context.key;
    const errorMessage = error.details[0].message;
    return errorResponse(res, 400, errorMessage, errorField);
  }
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });
  if (user) {
    const passwordMatch = await argon.verify(user.password, password);
    if (passwordMatch) {
      return {
        email: user.email,
        token: generateToken({ id: user.id, email: user.email }),
        tokenType: 'Bearer',
      };
    }
  }
  return errorResponse(res, 403, 'Invalid Credentials', '');
};
