import { Board } from '../domain/board';
import { generateUUID } from '../domain/uuid';
import * as boardDB from "../infra/board";

export const getAllBoard = async () => {
    try {
        const board = await boardDB.getAllBoard();
        return board;
    } catch (error) {
        console.error("Error in getting all board:", error);
        throw new Error(`Error in getting all board: ${error}`);
    }
}

export const getBoardById = async (boardId: string) => {
    try {
        const board = await boardDB.getBoardById(boardId);
        if (!board) {
            throw new Error(`Board with id ${boardId} not found`);
        } else {
            return board;
        }
    } catch (error) {
        console.error("Error in getting board by id:", error);
        throw new Error(`Error in getting board by id: ${error}`);
    }
}

export const getBoardByUserId = async (userId: string) => {
    try {
        const boards = await boardDB.getBoardByUserId(userId);
        return boards;
    } catch (error) {
        console.error("Error in getting board by user id:", error);
        throw new Error(`Error in getting board by user id: ${error}`);
    }
}

export const createBoard = async (boardInput: Board, userId: string) => {
    boardInput.user_id = userId;
    try {
        await boardDB.createBoard(boardInput);
    } catch (error) {
        console.error("Error in creating board:", error);
        throw new Error(`Error in creating board: ${error}`);
    }
}

export const finishedBoard = async (boardId: string, userId: string) => {
    try {
        await boardDB.finishedBoard(boardId, userId);
    } catch (error) {
        console.error("Error in finished board:", error);
        throw new Error(`Error in finished board: ${error}`);
    }
}

export const finishedChallenge = async (boardId: string) => {
    try {
        await boardDB.finishedChallenge(boardId);
    } catch (error) {
        console.error("Error in finished challenge:", error);
        throw new Error(`Error in finished challenge: ${error}`);
    }
}

export const incrementAchievement = async (boardId: string) => {
    try {
        await boardDB.incrementAchievement(boardId);
    } catch (error) {
        console.error("Error in increment achievement:", error);
        throw new Error(`Error in increment achievement: ${error}`);
    }
}

export const updateRank = async () => {
    try {
        await boardDB.updateRank();
    } catch (error) {
        console.error("Error in update rank:", error);
        throw new Error(`Error in update rank: ${error}`);
    }
}

export const updateBoard = async (boardInput: Board, boardId: string, userId: string) => {
    try {
        boardInput.id = boardId;
        boardInput.user_id = userId;
        await boardDB.updateBoard(boardInput);
    } catch (error) {
        console.error("Error in updating board:", error);
        throw new Error(`Error in updating board: ${error}`);
    }
}

export const deleteBoard = async (boardId: string, userId: string) => {
    try {
        await boardDB.deleteBoard(boardId, userId);
    } catch (error) {
        console.error("Error in deleting board:", error);
        throw new Error(`Error in deleting board: ${error}`);
    }
}

export const registrationRequest = async (boardId: string, userId: string) => {
    try {
        if (await boardDB.checkBoardRegister(boardId)) {
            await boardDB.registrationRequest(boardId, userId);
        } else {
            throw new Error(`Board with id ${boardId} capacity is full.`);
        }
    } catch (error) {
        console.error("Error in registration request:", error);
        throw new Error(`Error in registration request: ${error}`);
    }
}

export const getChallengeByBoardId = async (boardId: string) => {
    try {
        const users = await boardDB.getChallengeByBoardId(boardId);
        return users;
    } catch (error) {
        console.error("Error in get registration:", error);
        throw new Error(`Error in get registration: ${error}`);
    }
}

export const getChallengeByUserId = async (userId: string) => {
    try {
        const users = await boardDB.getChallengeByUserId(userId);
        return users;
    } catch (error) {
        console.error("Error in get registration:", error);
        throw new Error(`Error in get registration: ${error}`);
    }
}

export const getCheckChallengeByUserIdAndBoardId = async (userId: string, boardId: string) => {
    try {
        const check = await boardDB.getCheckChallengeByUserIdAndBoardId(userId, boardId);
        return check == null;
    } catch (error) {
        console.error("Error in get registration:", error);
        throw new Error(`Error in get registration: ${error}`);
    }
}

export const getChallengeCount = async (BoardId: string) => {
    try {
        const count = await boardDB.getChallengeCount(BoardId);
        return count;
    } catch (error) {
        console.error("Error in get registration:", error);
        throw new Error(`Error in get registration: ${error}`);
    }
}