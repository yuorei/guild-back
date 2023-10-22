import { Request, Response } from "express";
import { createUser as createUserApplication } from "../application/user";

// POST
export const createUser = async (req: Request, res: Response) => {
    try {
        const userInput = req.body;
        const user = await createUserApplication(userInput);
        return res.status(200).json({
            message: user,
        });
    } catch (error) {
        console.error("Error in creating user:", error);
        return res.status(500).json({
            message: `Internal Server Error: ${error}`,
        });
    }
};