import { createUser } from './lib/functions-without-context'
import { prismaMock } from '../lib/singleton'

test('should create new user ', async () => {
  let ct = new Date()
  let ut = new Date()
  const user = {
    id: "db_uuid",
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    rank: 'S',
    total_achievements: 0,
    profileImageURL: 'https://example.com/image.jpg',
    createdAt: ct,
    updatedAt: ut,
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
    createdAt: ct,
    updatedAt: ut,
  })
})
