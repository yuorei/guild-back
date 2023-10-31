import { Request, Response } from "express";
import {
    getAllUser as getAllUserApplication,
    getUserById as getUserByIdApplication,
    createUser as createUserApplication,
} from "../application/user";

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await getAllUserApplication();
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
        const user = await getUserByIdApplication(userId);
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
        const user = await createUserApplication(userInput);
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