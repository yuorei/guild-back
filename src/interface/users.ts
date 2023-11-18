import { Request, Response } from "express";
import * as userApplication from "../application/user";
import * as fs from 'fs';
import { User } from '../domain/user';
import { generateUUID } from '../domain/uuid';

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
        let imageURL: string = "";
        userInput.id = generateUUID();
        if (req.file) {
            let image = req.file;
            imageURL = userInput.id as string + "." + image?.originalname.split('.').pop();
            imageURL = `/app/images/${imageURL}`
            try {
                fs.writeFileSync(imageURL, image?.buffer as Buffer);
            } catch (error) {
                console.error('File write error:', error);
                return res.status(500).json({ error: `Internal server error: ${error}` });
            }
        }

        let user: User = {
            id: generateUUID(),
            name: userInput.name,
            email: userInput.email,
            password: userInput.password,
            rank: "E",
            total_achievements: 0,
            profileImageURL: imageURL,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await userApplication.createUser(user);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in creating user:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const userInput = req.body;
        await userApplication.updateUser(userId as string, userInput);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in updating user:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        await userApplication.deleteUser(userId as string);
        return res.status(200).send();
    } catch (error) {
        console.error("Error in deleting user:", error);
        return res.status(500).json({
            error: `Internal Server Error: ${error}`,
        });
    }
}