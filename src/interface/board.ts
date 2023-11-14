import { Request, Response } from "express";
import * as boardApplication from "../application/board";

export const getAllBoard = async (req: Request, res: Response) => {
    try {
        const boards = await boardApplication.getAllBoard();
        return res.status(200).json({
            boards
        });
    } catch (error) {
        console.error("Error in getting all boards:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const getBoardById = async (req: Request, res: Response) => {
    try {
        const boardId = req.params.id;
        const board = await boardApplication.getBoardById(boardId);
        return res.status(200).json({
            board
        });
    } catch (error) {
        console.error("Error in getting board by id:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
}

export const getBoardByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const boards = await boardApplication.getBoardByUserId(userId as string);
        return res.status(200).json({
            boards
        });
    } catch (error) {
        console.error("Error in getting board by user id:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
}

export const createBoard = async (req: Request, res: Response) => {
    try {
        const boardInput = req.body;
        const userId = req.user?.id;
        await boardApplication.createBoard(boardInput, userId as string);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in creating board:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const updateBoard = async (req: Request, res: Response) => {
    try {
        const boardId = req.params.id;
        const boardInput = req.body;
        const userId = req.user?.id;
        await boardApplication.updateBoard(boardInput, boardId, userId as string);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in updating board:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const deleteBoard = async (req: Request, res: Response) => {
    try {
        const boardId = req.params.id;
        const userId = req.user?.id;
        await boardApplication.deleteBoard(boardId, userId as string);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in deleting board:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const registrationRequest = async (req: Request, res: Response) => {
    try {
        const boardId = req.body.board_id;
        const userId = req.user?.id;
        await boardApplication.registrationRequest(boardId as string, userId as string);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in registration request:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
}

export const getChallengeByBoardId = async (req: Request, res: Response) => {
    const boardId = req.params.id;
    try {
        const challenges = await boardApplication.getChallengeByBoardId(boardId);
        return res.status(200).json({
            challenges
        });
    } catch (error) {
        console.error("Error in getting challenge by board id:", error);
        throw new Error(`Error in getting challenge by board id: ${error}`);
    }
}

export const getChallengeByUserId = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    try {
        const challenges = await boardApplication.getChallengeByUserId(userId as string);
        return res.status(200).json({
            challenges
        });
    } catch (error) {
        console.error("Error in getting challenge by user id:", error);
        throw new Error(`Error in getting challenge by user id: ${error}`);
    }
}

export const getCheckChallengeByUserIdAndBoardId = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const boardId = req.params.id;
    try {
        const check = await boardApplication.getCheckChallengeByUserIdAndBoardId(userId as string, boardId);
        return res.status(200).json({
            check
        });
    } catch (error) {
        console.error("Error in getting challenge by user id and board id:", error);
        throw new Error(`Error in getting challenge by user id and board id: ${error}`);
    }
}

export const getChallengeCount = async (req: Request, res: Response) => {
    const boardId = req.params.id;
    try {
        const count = await boardApplication.getChallengeCount(boardId);
        return res.status(200).json({
            count
        });
    } catch (error) {
        console.error("Error in getting challenge count:", error);
        throw new Error(`Error in getting challenge count: ${error}`);
    }
}