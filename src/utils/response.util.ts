
import { Response } from 'express';

export const sendResponse = <T>(
  res: Response,
  code: number,
  message: string,
  data?: T
) => {
  res.status(code).json({
    code,
    message,
    data,
  });
};
