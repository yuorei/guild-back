import { Request, Response } from "express";
import * as boardApplication from "../application/board";
import { generateUUID } from '../domain/uuid';
import { saveImage } from '../infra/saveImage';

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
        let boardInput = req.body;
        const userId = req.user?.id;
        const inputDate = new Date(boardInput.endDate);
        boardInput.endDate = inputDate.toISOString();
        boardInput.max = parseInt(boardInput.max, 10) as number;
        let imageURL: string = "";
        boardInput.id = generateUUID();
        if (req.file) {
            let image = req.file;
            try {
                image.originalname = boardInput.id as string + "." + image?.originalname.split('.').pop();
                imageURL = process.env.IMAGE_URL + "/" + image.originalname;
                saveImage(image)
            } catch (error) {
                console.error('File write error:', error);
                return res.status(500).json({ error: `Internal server error: ${error}` });
            }
        }
        await boardApplication.createBoard(boardInput, userId as string, imageURL);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in creating board:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const finishedBoard = async (req: Request, res: Response) => {
    try {
        const boardId = req.params.id;
        const userId = req.user?.id;
        await boardApplication.finishedBoard(boardId, userId as string);
        await boardApplication.finishedChallenge(boardId);
        await boardApplication.incrementAchievement(boardId);
        await boardApplication.updateRank();
        return res.status(200).send();
    } catch (error) {
        console.error("Error in finishing board:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
}



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