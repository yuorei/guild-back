import { User } from '../domain/user';
import { validatePassword } from '../domain/passward';
import { validateEmail } from '../domain/email';
import { hashPassword } from '../domain/passward';
import { generateUUID } from '../domain/uuid';
import * as userDB from "../infra/users";

export const getAllUser = async () => {
    try {
        let users = await userDB.getAllUser();
        users.forEach((user) => {
            user.password = '';
        });
        return users;
    } catch (error) {
        console.error("Error in getting all users:", error);
        throw new Error(`Error in getting all users: ${error}`);
    }
}

export const getUserById = async (userId: string) => {
    try {
        let user = await userDB.getUserById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        } else {
            // パスワードは返さない
            user.password = '';
            return user;
        }
    } catch (error) {
        console.error("Error in getting user by id:", error);
        throw new Error(`Error in getting user by id: ${error}`);
    }
}


export const createUser = async (userInput: User) => {
    // パスワードのバリデーション
    if (validatePassword(userInput.password)) {
        userInput.password = await hashPassword(userInput.password);
    } else {
        throw new Error(`Invalid password: ${userInput.password}`);
    }

    // メールアドレスのバリデーション
    if (!validateEmail(userInput.email)) {
        throw new Error(`Invalid email address: ${userInput.email}`);
    }

    userInput.id = generateUUID();

    try {
        await userDB.createUser(userInput);
    } catch (error) {
        console.error("Error in creating user:", error);
        throw new Error(`Error in creating user: ${error}`);
    }
}

export const updateUser = async (userId: string, userInput: User) => {
    // パスワードのバリデーション
    if (userInput.password) {
        if (validatePassword(userInput.password)) {
            userInput.password = await hashPassword(userInput.password);
        } else {
            throw new Error(`Invalid password: ${userInput.password}`);
        }
    }

    // メールアドレスのバリデーション
    if (userInput.email) {
        if (!validateEmail(userInput.email)) {
            throw new Error(`Invalid email address: ${userInput.email}`);
        }
    }

    try {
        await userDB.updateUser(userId, userInput);
    } catch (error) {
        console.error("Error in updating user:", error);
        throw new Error(`Error in updating user: ${error}`);
    }
}

export const deleteUser = async (userId: string) => {
    try {
        await userDB.deleteUser(userId);
    } catch (error) {
        console.error("Error in deleting user:", error);
        throw new Error(`Error in deleting user: ${error}`);
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        return await userDB.getUserByEmail(email);
    } catch (error) {
        console.error("Error in getting all users:", error);
        throw new Error(`Error in getting all users: ${error}`);
    }
}
