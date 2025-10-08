import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { sendResponse } from "../utils/response.util";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page, limit, search } = req.query;
    const users = await userService.getUsers(
      Number(page),
      Number(limit),
      search as string
    );
    sendResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Error getting users");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      sendResponse(res, 200, "User retrieved successfully", user);
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (error) {
    sendResponse(res, 500, "Error getting user");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return sendResponse(res, 400, "Name are required");
    }
    const updatedUser = await userService.updateUser(req.params.id, name);
    if (updatedUser) {
      sendResponse(res, 200, "User updated successfully", updatedUser);
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (error) {
    sendResponse(res, 500, "Error updating user");
  }
};

export const updateUserPhoto = async (req: Request, res: Response) => {
  try {
    const photo = req.file;
    if (!photo) {
      return sendResponse(res, 400, "Photo is required");
    }
    const updatedUser = await userService.updateUserPhoto(req.params.id, photo);
    if (updatedUser) {
      sendResponse(res, 200, "User photo updated successfully", updatedUser);
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Error updating user photo");
  }
};
