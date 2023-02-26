import { RegisterProfile } from '../models';
import prisma from '../../prisma/prisma-client';
import { Response } from 'express';
import EntryValidator from '../utils/validator';
import { errorResponse } from '../middleware';

const uniqueUsernameAndUserId = async (
  username: string,
  userId: string,
  res: Response
) => {
  const checkUsername = await prisma.profile.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (checkUsername) {
    return errorResponse(
      res,
      409,
      'username already exists. choose a unique username'
    );
  }

  const existingUserId = await prisma.profile.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  if (existingUserId) {
    return errorResponse(res, 400, 'User cannot create multiple profile');
  }
};

export const createProfile = async (
  input: RegisterProfile,
  userId: string,
  res: Response
) => {
  const { username, bio, followers } = input;
  const { error } = EntryValidator.validateProfileInput(input);
  if (error) {
    const errorField = error.details[0].context.key;
    const errorMessage = error.details[0].message;
    return errorResponse(res, 400, errorMessage, errorField);
  }
  await uniqueUsernameAndUserId(username, userId, res);
  const profile = await prisma.profile.create({
    data: {
      username,
      bio,
      followers,
      //   userId: userId,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      username: true,
      bio: true,
      user: true,
      followers: true,
      created_at: true,
      updated_at: true,
    },
  });
  return profile;
};
