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

export const createComment = async (req: Request, res: Response) => {
    const commentInput = req.body;
    try {
        await commentApplication.createComment(commentInput);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in creating comment:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const commentInput = req.body;
    try {
        await commentApplication.updateComment(commentId, commentInput);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in updating comment:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    try {
        await commentApplication.deleteComment(commentId);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in deleting comment:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const getCommentById = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    try {
        const comment = await commentApplication.getCommentById(commentId);
        return res.status(200).json({
            comment,
        });
    } catch (error) {
        console.error("Error in getting comment:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const getCommentByUserId = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    try {
        const comments = await commentApplication.getCommentByUserId(userId as string);
        return res.status(200).json({
            comments,
        });
    } catch (error) {
        console.error("Error in getting comment by user id:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const getCommentByPostId = async (req: Request, res: Response) => {
    const postId = req.params.id;
    try {
        const comments = await commentApplication.getCommentByPostId(postId);
        return res.status(200).json({
            comments,
        });
    } catch (error) {
        console.error("Error in getting comment by post id:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};
