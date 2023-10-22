import { CreateUser } from '../domain/user';
import { validatePassword } from '../domain/passward';
import { validateEmail } from '../domain/email';
import { hashPassword } from '../domain/passward';
import { generateUUID } from '../domain/uuid';
import { createUser as createUserDB } from "../infra/users";

export const createUser = async (userInput: CreateUser) => {
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