import Joi, { ObjectSchema } from 'joi';
import ErrorMessage from './customMessage';
import { RegisteredUser, RegisterProfile } from '../models';

interface ValidationResult {
  error?: {
    details: {
      [x: string]: any;
      message: string;
    }[];
  };
}

class EntryValidator {
  private static registerPassError: string =
    'The password must contain at least 8 characters including at least one uppercase, one lowercase, one number';

  private static pattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  private static validateSignupSchema: ObjectSchema = Joi.object({
    email: Joi.string().required().min(1).email().messages(ErrorMessage.email),
    password: Joi.string()
      .required()
      .min(8)
      .messages(ErrorMessage.password)
      .regex(this.pattern)
      .message(this.registerPassError),
  });

  private static validateLoginSchema: ObjectSchema = Joi.object({
    email: Joi.string().required().messages(ErrorMessage.email),
    password: Joi.string().required().messages(ErrorMessage.password),
  });

  private static validateProfileSchema: ObjectSchema = Joi.object({
    username: Joi.string().required().messages(ErrorMessage.username),
    followers: Joi.number().required().messages(ErrorMessage.followers),
    bio: Joi.string().max(100).messages(ErrorMessage.bio),
  });

  private static options: any = { language: { key: '{{key}}' } };

  static validateSignup(entry: RegisteredUser): ValidationResult {
    return this.validateSignupSchema.validate(entry, this.options);
  }

  static validateLogin(entry: RegisteredUser): ValidationResult {
    return this.validateLoginSchema.validate(entry, this.options);
  }

  static validateProfileInput(entry: RegisterProfile): ValidationResult {
    return this.validateProfileSchema.validate(entry, this.options);
  }
}

export default EntryValidator;
