import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
import Retweet from '#models/retweet'
import string from '@adonisjs/core/helpers/string'
import Hashtag from '#models/hashtag'

export default class TweetsController {
  async store({ request, response, auth }: HttpContext) {
    try {
      const fileTemp = request.file('photos')
      let newName = null

      if (fileTemp) {
        newName = `${string.generateRandom(32)}.${fileTemp.extname}`

        await fileTemp.move('public/uploads', {
          name: newName,
          overwrite: true,
        })
        newName =`/uploads/${newName}`
      }

      let contenu = request.input('contenu')
      let userId = auth.user?.id
      const tweet =await Tweet.create({ contenu, userId, photo: newName })

      const hashtags = contenu.match(/#\w+/g) 
      if (hashtags) {
        for (const tag of hashtags) {
          const hashtag = await Hashtag.firstOrCreate({ name: tag.slice(1) })
          await tweet.related('hashtags').attach([hashtag.id])
        }
      }
      return response.redirect().toRoute('time_line.show_data')
    } catch (error) {
      return error.message
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      let tweet = await Tweet.findOrFail(params.id)
      tweet.delete()
      return response.redirect().toRoute('time_line.show_data')
    } catch (error) {
      return response.redirect().back()
    }
  }

  async retweet({ params, response,auth }: HttpContext) {
    try {
      let tweet = await Tweet.findOrFail(params.id)

      Retweet.create({
        userId:auth.user?.id,
        tweetId:tweet.id,
      })
      return response.redirect().toRoute('time_line.show_data')
    } catch (error) {
      return error.message
    }
  }

  async edite() {}

  async update() {}
}
