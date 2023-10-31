// import { create } from 'domain'
import { getAllUser, createUser } from '../infra/users'
import { prismaMock } from '../lib/singleton'

test('should get all users', async () => {
  let createdAt = new Date()
  let updatedAt = new Date()
  const users = [
    {
      id: 'db_uuid',
      name: 'John Doe',
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
      name: 'Jane Doe',
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

  await expect(getAllUser()).resolves.toEqual([
    {
      id: 'db_uuid',
      name: 'John Doe',
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
      name: 'Jane Doe',
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

test('should create new user ', async () => {
  let createdAt = new Date()
  let updatedAt = new Date()
  const user = {
    id: "db_uuid",
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual({
    id: "db_uuid",
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: createdAt,
    updatedAt: updatedAt,
  })
})
