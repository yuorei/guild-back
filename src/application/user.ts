import { User } from '../domain/user';
import { validatePassword } from '../domain/passward';
import { validateEmail } from '../domain/email';
import { hashPassword } from '../domain/passward';
import { generateUUID } from '../domain/uuid';
import {
    createUser as createUserDB,
    getUserById as getUserByIdDB,
    getAllUser as getAllUserDB
} from "../infra/users";

export const getAllUser = async () => {
    try {
        var users = await getAllUserDB();
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
        var user = await getUserByIdDB(userId);
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
        var user = await createUserDB(userInput);
        // パスワードは返さない
        user.password = '';
        return user;
    } catch (error) {
        console.error("Error in creating user:", error);
        throw new Error(`Error in creating user: ${error}`);
    }
}