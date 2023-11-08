import request from 'supertest';
import app from '../server';
import * as boardDB from '../infra/board';
import * as usersDB from '../infra/users';
import { User } from '../domain/user';
import { issueToken } from '../interface/auth';
// import nock from 'nock';

jest.mock('../infra/board');
jest.mock('../infra/users');

const userInput: User = {
    id: 'db_uuid',
    name: 'yuorei',
    email: 'john@example.com',
    password: 'Password1234',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const token = issueToken(userInput);
// 認可のために必要なユーザー情報をモックする
(usersDB.getUserById as jest.Mock).mockResolvedValue(userInput);
(usersDB.createUser as jest.Mock).mockResolvedValue(userInput);


const exdDate = new Date().toString();
const createdAt = new Date().toString();
const updatedAt = new Date().toString();

const mockBoard = [
    {
        id: 'board_id',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: exdDate,
        lebel: 'lebel',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    },
    {
        id: 'board_id2',
        user_id: 'creator_id2',
        title: 'title2',
        description: 'description2',
        reward: 'reward2',
        endDate: exdDate,
        lebel: 'lebel2',
        max: 20,
        min: 2,
        imageURL: 'imageURL2',
        createdAt: createdAt,
        updatedAt: updatedAt,
    },
];
(boardDB.getAllBoard as jest.Mock).mockResolvedValue(mockBoard);

describe('依頼に挑戦をする: POST /board/challenge/:boardId', () => {
    const exdDate = new Date().toString();
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const mockBoard = {
        id: 'board_id',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: exdDate,
        lebel: 'lebel',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    it('依頼に挑戦をする: 成功', async () => {
        (boardDB.registrationRequest as jest.Mock).mockResolvedValue(mockBoard);
        (boardDB.checkBoardRegister as jest.Mock).mockResolvedValue(true);

        const response = await request(app).post('/board/challenge')
            .send({
                board_id: 'board_id',
            })
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({});
    });
})

describe('依頼をboard_idで取得する: GET /board/challenge/:boardId', () => {
    const exdDate = new Date().toString();
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const mockBoard = {
        id: 'board_id',
        user_id: 'user_id',
        title: 'title',
        description: 'description',
        reward: 'reward',
        endDate: exdDate,
        lebel: 'lebel',
        max: 10,
        min: 1,
        imageURL: 'imageURL',
        createdAt: createdAt,
        updatedAt: updatedAt,
    };

    it('依頼をboard_idで取得する: 成功', async () => {
        (boardDB.getChallengeByBoardId as jest.Mock).mockResolvedValue(mockBoard);
        const response = await request(app).get('/board/challenge/board_id')
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            "challenges": mockBoard
        });
    });
});