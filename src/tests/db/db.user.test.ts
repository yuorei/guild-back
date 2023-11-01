import * as userDB from '../../infra/users'
import { prismaMock } from '../../lib/singleton'

test('全てのuserを取得', async () => {
  let createdAt = new Date()
  let updatedAt = new Date()
  const users = [
    {
      id: 'db_uuid',
      name: 'yuorei',
      email: 'john@example.com',
      password: 'password',
      rank: 'S',
      total_achievements: 0,
      profileImageURL: 'https://example.com/image.jpg',
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
    {
      id: 'db_uuid2',
      name: 'yuorei',
      email: 'john2@example.com',
      password: 'password',
      rank: 'S',
      total_achievements: 0,
      profileImageURL: 'https://example.com/image.jpg',
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
  ]

  prismaMock.user.findMany.mockResolvedValue(users)

  await expect(userDB.getAllUser()).resolves.toEqual([
    {
      id: 'db_uuid',
      name: 'yuorei',
      email: 'john@example.com',
      password: 'password',
      rank: 'S',
      total_achievements: 0,
      profileImageURL: 'https://example.com/image.jpg',
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
    {
      id: 'db_uuid2',
      name: 'yuorei',
      email: 'john2@example.com',
      password: 'password',
      rank: 'S',
      total_achievements: 0,
      profileImageURL: 'https://example.com/image.jpg',
      createdAt: createdAt,
      updatedAt: updatedAt,
    },
  ])
})

test('userをidから取得', async () => {
  let createdAt = new Date()
  let updatedAt = new Date()
  const user = {
    id: 'db_uuid',
    name: 'yuorei',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  }

  prismaMock.user.findUnique.mockResolvedValue(user)

  await expect(userDB.getUserById(user.id)).resolves.toEqual({
    id: 'db_uuid',
    name: 'yuorei',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  });
});


test('user登録', async () => {
  let createdAt = new Date()
  let updatedAt = new Date()
  const user = {
    id: "db_uuid",
    name: 'yuorei',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(userDB.createUser(user)).resolves.toEqual({
    id: "db_uuid",
    name: 'yuorei',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  })
})

test('user更新', async () => {
  let createdAt = new Date()
  let updatedAt = new Date()
  const user = {
    id: "db_uuid",
    name: 'yuorei',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  }

  prismaMock.user.update.mockResolvedValue(user)

  await expect(userDB.updateUser(user.id, user)).resolves.toEqual({
    id: "db_uuid",
    name: 'yuorei',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  })
})

test('user削除', async () => {
  let createdAt = new Date()
  let updatedAt = new Date()
  const user = {
    id: "db_uuid",
    name: 'yuorei',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  }

  prismaMock.user.delete.mockResolvedValue(user)

  await expect(userDB.deleteUser("user.id")).resolves.toEqual(true);
});

