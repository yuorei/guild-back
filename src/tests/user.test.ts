import request from 'supertest';
import app from '../app';
import * as usersDB from '../infra/users';
// import nock from 'nock';

jest.mock('../infra/users');

describe('全てのユーザー取得API: GET /users', () => {
    it('全てのユーザー取得API: 成功', async () => {
        const mockUsers = [
            {
                id: 'mocked_id',
                name: 'John Doe',
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
                name: 'Jane Doe',
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
        expect(response.body).toEqual({ message: mockUsers });
    });
});

describe('ユーザー作成API: POST /users', () => {
    it('ユーザー作成API: 成功', async () => {
        let createdAt = new Date().toISOString();
        let updatedAt = new Date().toISOString();

        const userInput = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password1234',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
            createdAt: createdAt,
            updatedAt: updatedAt,
        };

        const mockUser = { ...userInput, id: 'mocked_id', };

        (usersDB.createUser as jest.Mock).mockResolvedValue(mockUser);

        // const scope = nock('http://localhost:8080')
        //     .post('/users')
        //     .reply(200, mockUser);

        const response = await request(app)
            .post('/users')
            .send(userInput);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ message: mockUser });
    });

    it('ユーザー作成API: 失敗 (Internal Server Error)', async () => {
        const userInput = {
            name: 'Jane Doe',
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
        expect(response.body).toEqual({ message: 'Internal Server Error: Error: Error in creating user: Error: Mocked error' });
    });
});
