import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { sendResponse } from "../utils/response.util";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendResponse(res, 400, "Name, email, and password are required");
    }
    const newUser = await authService.register(name, email, password);
    sendResponse(res, 201, "User registered successfully", newUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Error registering user");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(res, 400, "Email and password are required");
    }
    const result = await authService.login(email, password);
    if (result) {
      sendResponse(res, 200, "Login successful", result);
    } else {
      sendResponse(res, 401, "Invalid credentials");
    }
  } catch (error) {
    sendResponse(res, 500, "Error logging in");
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return sendResponse(res, 400, "Email and new password are required");
    }
    const success = await authService.changePassword(email, newPassword);
    if (success) {
      sendResponse(res, 200, "Password changed successfully");
    } else {
      sendResponse(res, 400, "Could not change password");
    }
  } catch (error) {
    sendResponse(res, 500, "Error changing password");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { uid } = res.locals;
    const success = await authService.logout(uid);
    if (success) {
      sendResponse(res, 200, "Logout successful");
    } else {
      sendResponse(res, 400, "Could not log out");
    }
  } catch (error) {
    sendResponse(res, 500, "Error logging out");
  }
};

export const checkEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return sendResponse(res, 400, "Email is required");
    }
    const exists = await authService.checkEmail(email);
    sendResponse(res, 200, "Email check successful", { exists });
  } catch (error) {
    sendResponse(res, 500, "Error checking email");
  }
};
