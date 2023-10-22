import request from 'supertest';
import app from '../app';
import * as usersDB from '../infra/users';
// import nock from 'nock';

jest.mock('../infra/users');

describe('ユーザー作成API: POST /users', () => {
    it('ユーザー作成API: 成功', async () => {
        const userInput1 = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            rank: 'S',
            total_achievements: 0,
            profileImageURL: 'https://example.com/image.jpg',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const mockUser1 = { ...userInput1, id: 'mocked_id' };

        (usersDB.createUser as jest.Mock).mockResolvedValue(mockUser1);

        // const scope = nock('http://localhost:8080')
        //     .post('/users')
        //     .reply(200, mockUser);

        const response = await request(app)
            .post('/users')
            .send(userInput1);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ message: mockUser1 });

        expect(usersDB.createUser).toHaveBeenCalledWith(userInput1);
    });

    it('ユーザー作成API: 失敗 (Internal Server Error)', async () => {
        const userInput2 = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: 'password123',
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
            .send(userInput2);

        expect(response.status).toEqual(500);
        expect(response.body).toEqual({ message: 'Internal Server Error' });

        expect(usersDB.createUser).toHaveBeenCalledWith(userInput2);
    });

});
