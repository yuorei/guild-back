import { Request, Response } from "express";
import * as userApplication from "../application/user";

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await userApplication.getAllUser();
        return res.status(200).json({
            users
        });
    } catch (error) {
        console.error("Error in getting all users:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userApplication.getUserById(userId);
        return res.status(200).json({
            user
        });
    } catch (error) {
        console.error("Error in getting user by id:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const userInput = req.body;
        const user = await userApplication.createUser(userInput);
        return res.status(200).json({
            user
        });
    } catch (error) {
        console.error("Error in creating user:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userInput = req.body;
        const user = await userApplication.updateUser(userId, userInput);
        return res.status(200).json({
            user
        });
    } catch (error) {
        console.error("Error in updating user:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        await userApplication.deleteUser(userId);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in deleting user:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
}