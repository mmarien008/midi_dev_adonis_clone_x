import Hashtag from '#models/hashtag'
import type { HttpContext } from '@adonisjs/core/http'

export default class HashtagsController {

      public async show({ params, view }: HttpContext) {
    const hashtagName = params.name

    const hashtag = await Hashtag.query()
      .where('name', hashtagName)
      .preload('tweets', (tweetQuery) => {
        tweetQuery
          .preload('user')
          .preload('likeTweets')
          .preload('retweets')
          .preload('commentaires', (commentsQuery) => {
            commentsQuery.preload('user').preload('LikeCommentaires')
          })
          .orderBy('createdAt', 'desc')
      })
      .firstOrFail()

    return view.render('pages/hashtag/show', { hashtag })
  }

    

}