import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
import Retweet from '#models/retweet'

export default class TimeLinesController {
  async show_data({ view }: HttpContext) {
    const tweets = await Tweet.query()
      .preload('user')
      .preload('likeTweets')
      .preload('retweets')
      .preload('hashtags')
      .preload('commentaires', (commentsQuery) => {
        commentsQuery.preload('user').preload('LikeCommentaires')
      })
      .orderBy('tweets.id', 'desc')

    const retweets = await Retweet.query()
      .preload('user')
      .preload('tweet', (tweetQuery) => {
        tweetQuery
          .preload('user')
          .preload('likeTweets')
          .preload('commentaires', (commentsQuery) => {
            commentsQuery.preload('user').preload('LikeCommentaires')
          })
      })
      .orderBy('id', 'desc')

      

    return view.render('pages/time_line/show_time_line', { tweets })
  }
}
