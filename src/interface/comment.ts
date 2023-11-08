import { Request, Response } from "express";
import * as commentApplication from "../application/comment";

export const getAllComment = async (req: Request, res: Response) => {
    try {
        const comments = await commentApplication.getAllComment();
        return res.status(200).json({
            comments
        });
    } catch (error) {
        console.error("Error in getting all comments:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};