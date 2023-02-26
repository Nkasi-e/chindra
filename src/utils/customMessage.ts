import { LanguageMessages } from 'joi';

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

  static username: LanguageMessages = {
    'any.required': `username is required`,
    'string.empty': 'The username field is not allowed to be empty',
    'string.email': 'username must be a valid username address',
    'string.min': 'username must be at least {{#limit}} character long',
    'string.max':
      'username length must be less than or equal to {{#limit}} character long',
  };

  static followers: LanguageMessages = {
    'any.required': `followers is required`,
    'string.empty': 'The followers field is not allowed to be empty',
    'string.email': 'followers must be a valid followers address',
    'string.min': 'followers must be at least {{#limit}} character long',
    'string.max':
      'followers length must be less than or equal to {{#limit}} character long',
  };

  static bio: LanguageMessages = {
    'any.required': `bio is required`,
    'string.empty': 'The bio field is not allowed to be empty',
    'string.email': 'bio must be a valid bio address',
    'string.min': 'bio must be at least {{#limit}} character long',
    'string.max':
      'bio length must be less than or equal to {{#limit}} character long',
  };
}

export default ErrorMessage;
