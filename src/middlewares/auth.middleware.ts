
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { sendResponse } from '../utils/response.util';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return sendResponse(res, 401, 'Unauthorized');
  }

  const split = authorization.split('Bearer ');
  if (split.length !== 2) {
    return sendResponse(res, 401, 'Unauthorized');
  }

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
    res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email };
    return next();
  } catch (err: any) {
    console.error(`${err.code} -  ${err.message}`);
    return sendResponse(res, 401, 'Unauthorized');
  }
};
