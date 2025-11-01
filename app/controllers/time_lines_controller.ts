import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'


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

   

      

    return view.render('pages/time_line/show_time_line', { tweets })
  }
}
