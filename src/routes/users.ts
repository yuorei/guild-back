import { Request, Response } from "express";
import {
    createUser as createUserApplication,
    getAllUser as getAllUserApplication
} from "../application/user";

// GET
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

// POST
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