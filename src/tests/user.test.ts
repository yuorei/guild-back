import request from 'supertest';
import app from '../server';
import * as usersDB from '../infra/users';
import { User } from '../domain/user';
import { issueToken } from '../interface/auth';
// import nock from 'nock';

jest.mock('../infra/users');

describe('全てのユーザー取得API: GET /users', () => {
    it('全てのユーザー取得API: 成功', async () => {
        const mockUsers = [
            {
                id: 'mocked_id',
                name: 'yuorei',
                email: 'john@example.com',
                password: 'Password1234',
                rank: 'S',
                total_achievements: 0,
                profileImageURL: 'https://example.com/image.jpg',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'mocked_id2',
                name: 'yuorei',
                email: 'john@example.com',
                password: 'Password1234',
                rank: 'S',
                total_achievements: 0,
                profileImageURL: 'https://example.com/image.jpg',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ];

        (usersDB.getAllUser as jest.Mock).mockResolvedValue(mockUsers);

        const response = await request(app).get('/users');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            users: [
                {
                    id: 'mocked_id',
                    name: 'yuorei',
                    email: 'john@example.com',
                    password: '',
                    rank: 'S',
                    total_achievements: 0,
                    profileImageURL: 'https://example.com/image.jpg',
                    createdAt: mockUsers[0].createdAt,
                    updatedAt: mockUsers[0].updatedAt,
                },
                {
                    id: 'mocked_id2',
                    name: 'yuorei',
                    email: 'john@example.com',
                    password: '',
                    rank: 'S',
                    total_achievements: 0,
                    profileImageURL: 'https://example.com/image.jpg',
                    createdAt: mockUsers[1].createdAt,
                    updatedAt: mockUsers[1].updatedAt,
                },
            ]
        });
    });
});

describe('iDでユーザー取得API: GET /users/:id', () => {
    it('iDでユーザー取得API: 成功', async () => {
        const mockUser = {
            id: 'mocked_id',
            name: 'yuorei',
            email: 'john@example.com',
            password: 'Password1234',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        (usersDB.getUserById as jest.Mock).mockResolvedValue(mockUser);

        const response = await request(app).get('/users/mocked_id');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            user: {
                id: 'mocked_id',
                name: 'yuorei',
                email: 'john@example.com',
                password: '',
                rank: 'S',
                total_achievements: 0,
                profileImageURL: 'https://example.com/image.jpg',
                createdAt: mockUser.createdAt,
                updatedAt: mockUser.updatedAt,
            }
        });
    });
});

describe('ユーザー作成API: POST /users', () => {
    it('ユーザー作成API: 成功', async () => {
        let createdAt = new Date().toISOString();
        let updatedAt = new Date().toISOString();

        const userInput = {
            name: 'yuorei',
            email: 'john@example.com',
            password: 'Password1234',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
        };

        const mockUser = { ...userInput, id: 'mocked_id', createdAt, updatedAt };

        (usersDB.createUser as jest.Mock).mockResolvedValue(mockUser);

        // const scope = nock('http://localhost:8080')
        //     .post('/users')
        //     .reply(200, mockUser);

        const response = await request(app)
            .post('/users')
            .send(userInput);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
    });

    it('ユーザー作成API: 失敗 (Internal Server Error)', async () => {
        const userInput = {
            name: 'yuorei',
            email: 'jane@example.com',
            password: 'Password123',
            rank: 'A',
            total_achievements: 5,
            profileImageURL: 'https://example.com/image2.jpg',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const errorMessage = 'Mocked error';

        (usersDB.createUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .post('/users')
            .send(userInput);

        expect(response.status).toEqual(500);
        expect(response.body).toEqual({ error: 'Internal Server Error: Error: Error in creating user: Error: Mocked error' });
    });
});

describe('ユーザー更新API: PUT /users/:id', () => {
    it('ユーザー更新API: 成功', async () => {
        const userInput: User = {
            id: 'mocked_id',
            name: 'yuorei',
            email: 'john@example.com',
            password: 'Password1234',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const token = issueToken(userInput)

        const mockUser = { ...userInput, id: 'mocked_id' };

        (usersDB.updateUser as jest.Mock).mockResolvedValue(mockUser);

        const response = await request(app)
            .put('/users')
            .send(userInput)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
    });
    it('ユーザー更新API: 認証失敗', async () => {
        const userInput: User = {
            id: 'mocked_id',
            name: 'yuorei',
            email: 'john@example.com',
            password: 'Password1234',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const mockUser = { ...userInput, id: 'mocked_id' };

        (usersDB.updateUser as jest.Mock).mockResolvedValue(mockUser);

        const response = await request(app)
            .put('/users')
            .send(userInput)
            .set('Authorization', `Bearer damy_token`)

        expect(response.status).toEqual(403);
        expect(response.body).toEqual({ "error": "認証情報が存在しません" });
    });
});

describe('ユーザー削除API: DELETE /users/:id', () => {
    it('ユーザー削除API: 成功', async () => {
        const mockUser: User = {
            id: 'mocked_id',
            name: 'yuorei',
            email: 'john@example.com',
            password: 'Password1234',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (usersDB.deleteUser as jest.Mock).mockResolvedValue(true);

        const token = issueToken(mockUser);

        const response = await request(app)
            .delete('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
    });

    it('ユーザー削除API: 失敗 (Internal Server Error)', async () => {
        const errorMessage = 'Mocked error';
        const mockUser: User = {
            id: 'mocked_id',
            name: 'yuorei',
            email: 'john@example.com',
            password: 'Password1234',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const token = issueToken(mockUser);

        (usersDB.deleteUser as jest.Mock).mockRejectedValue(new Error(errorMessage));

        const response = await request(app)
            .delete('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(500);
        expect(response.body).toEqual({
            error: 'Internal Server Error: Error: Error in deleting user: Error: Mocked error',
        });
    });
    it('ユーザー削除API: 認証失敗', async () => {
        const mockUser: User = {
            id: 'mocked_id',
            name: 'yuorei',
            email: 'john@example.com',
            password: 'Password1234',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (usersDB.deleteUser as jest.Mock).mockResolvedValue(true);

        const response = await request(app)
            .delete('/users')
            .set('Authorization', `Bearer damy_token`);

        expect(response.status).toEqual(403);
        expect(response.body).toEqual({ "error": "認証情報が存在しません" });
    });
});