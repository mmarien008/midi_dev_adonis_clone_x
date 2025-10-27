import type { HttpContext } from '@adonisjs/core/http'
import LikeTweet from '#models/like_tweet'
import LikeCommentaire from '#models/like_commentaire'

export default class LikesController {
  async likeTweets({ request, response }: HttpContext) {
    try {
      const { user_id, tweet_id } = request.only(['user_id', 'tweet_id'])

      const LikeExiste = await LikeTweet.query()
        .where('user_id', user_id)
        .where('tweet_id', tweet_id)
        .first()

      if (LikeExiste) {
        await LikeExiste.delete()
      } else {
        await LikeTweet.create({ userId: user_id, tweetId: tweet_id })
      }

      return response.redirect().back()
    } catch (error) {
      return error.message
    }
  }

  async likeCommentaire({ request, response }: HttpContext) {
    try {
         const LikeExiste = await LikeCommentaire.query()
        .where('user_id', request.input('user_id'))
        .where('commentaire_id', request.input('commentaire_id'))
        .first()

      if (LikeExiste) {
        await LikeExiste.delete()
      } else {
        await LikeCommentaire.create({
        userId: request.input('user_id'),
        commentaireId: request.input('commentaire_id'),
      })
      }


     

      return response.redirect().back()
    } catch (error) {
      return error.message
    }
  }
}
