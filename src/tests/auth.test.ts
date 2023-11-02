import request from 'supertest';
import app from '../server';
import * as usersDB from '../infra/users';
import { User } from '../domain/user';
import { issueToken } from '../interface/auth';
// import nock from 'nock';

jest.mock('../infra/users');
// テスト前にモックをリセット
beforeEach(() => {
    jest.resetAllMocks();
});

// loginのテスト
describe('ログインAPI: POST /auth/login', () => {
    it('ログインAPI: 成功', async () => {
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

        (usersDB.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

        const response = await request(app).post('/auth/login').send({
            email: 'john@example.com',
            password: 'Password1234',
        });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            token: issueToken(mockUser),
        });
    });

    it('ログインAPI: ユーザーが存在しない', async () => {
        (usersDB.getUserById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).post('/auth/login').send({
            email: 'john@example.com',
            password: 'Password1234',
        });
        (usersDB.getUserByEmail as jest.Mock).mockResolvedValue(null);
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({
            error: 'ユーザーが存在しません',
        });
    });
});