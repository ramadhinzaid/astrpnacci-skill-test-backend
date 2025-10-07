import * as admin from "firebase-admin";
import { User } from "../models/user.model";
import * as userService from "./user.service";
import { uploadFile } from "./storage.service";

export const register = async (
  name: string,
  email: string,
  password: string,
  photo?: Express.Multer.File
): Promise<
  Omit<User, "password" | "created_at" | "updated_at"> | undefined
> => {
  let photoUrl = "";
  if (photo) {
    photoUrl = await uploadFile(photo);
  }

  const userRecord = await admin.auth().createUser({
    email,
    password,
    displayName: name,
    photoURL: photoUrl,
  });

  const user = await userService.createUser(
    userRecord.uid,
    name,
    email,
    photoUrl
  );
  return user;
};

export const login = async (
  email: string,
  password: string
): Promise<
  | {
      user: Omit<User, "password" | "created_at" | "updated_at">;
      token: string;
    }
  | undefined
> => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    const user = await userService.getUserById(userRecord.uid);
    if (!user) {
      return undefined;
    }
    return { user, token };
  } catch (error) {
    return undefined;
  }
};

export const changePassword = async (
  email: string,
  newPassword: string
): Promise<boolean> => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(user.uid, { password: newPassword });
    return true;
  } catch (error) {
    return false;
  }
};

export const logout = async (uid: string): Promise<boolean> => {
  try {
    await admin.auth().revokeRefreshTokens(uid);
    return true;
  } catch (error) {
    return false;
  }
};

export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    await admin.auth().getUserByEmail(email);
    return true;
  } catch (error) {
    return false;
  }
};
