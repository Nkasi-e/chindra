import Joi, { LanguageMessages } from 'joi';

class ErrorMessage {
  static email: LanguageMessages = {
    'any.required': `email is required`,
    'string.empty': 'The email field is not allowed to be empty',
    'string.email': 'email must be a valid email address',
    'string.min': 'email must be at least {{#limit}} character long',
    'string.max':
      'email length must be less than or equal to {{#limit}} character long',
  };

  static password: LanguageMessages = {
    'any.required': `Password is required`,
    'string.empty': ' Password field is not allowed to be empty',
    'string.email': 'name must be a valid email address',
    'string.min': 'Password must be at least {{#limit}} character long',
    'string.max':
      'Password length must be less than or equal to {{#limit}} character long',
  };
}

export default ErrorMessage;
