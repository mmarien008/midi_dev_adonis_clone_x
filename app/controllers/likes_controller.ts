import type { HttpContext } from '@adonisjs/core/http'
import LikeTweet from '#models/like_tweet'
import LikeCommentaire from '#models/like_commentaire'

export default class LikesController {
  async likeTweets({ request,response }: HttpContext) {
    try {
      await LikeTweet.create({
        userId: request.input('user_id'),
        tweetId: request.input('tweet_id'),
      })

       return response.redirect().back()
    } catch (error) {
      return error.message
    }
  }


   async likeCommentaire({ request,response }: HttpContext) {
    try {
      await LikeCommentaire.create({
        userId: request.input('user_id'),
        commentaireId: request.input('commentaire_id'),
      })

       return response.redirect().back()
    } catch (error) {
      return error.message
    }
  }
}
