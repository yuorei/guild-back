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
    boardInput.id = generateUUID();
    boardInput.user_id = userId;

    try {
        await boardDB.createBoard(boardInput);
    } catch (error) {
        console.error("Error in creating board:", error);
        throw new Error(`Error in creating board: ${error}`);
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
