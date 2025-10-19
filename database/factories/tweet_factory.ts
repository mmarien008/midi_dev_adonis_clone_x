import factory from '@adonisjs/lucid/factories'
import Tweet from '#models/tweet'
import User from '#models/user'

export const TweetFactory = factory
  .define(Tweet, async ({ faker }) => {
    return {
      contenu: faker.lorem.text(),
    }
  })
  .build()

export const UserFactory = factory
  .define(User, ({ faker }) => {
    return {
      fullName: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('tweets', () => TweetFactory)
  .build()
