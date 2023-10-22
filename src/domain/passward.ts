import bcrypt from "bcryptjs";

export function validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
}

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
}
