import factory from '@adonisjs/lucid/factories'
import Commentaire from '#models/commentaire'


export const CommentaireFactory = factory
  .define(Commentaire, async ({ faker }) => {
    return {
      contenu: faker.lorem.text(),
      userId:1,
      tweetId:2
    }
  })
  .build()





