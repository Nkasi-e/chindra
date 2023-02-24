import { Response, Request, NextFunction } from 'express';

function errorResponse(
  res: Response,
  status: number,
  message: string,
  field: string
) {
  return res.status(status).json({
    error: {
      status,
      message,
      field: field || '',
    },
  });
}

class HttpException extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
      message,
      status,
    });
  } catch (error) {
    next(error);
  }
};

export { errorHandler, errorResponse };
