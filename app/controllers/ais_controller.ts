 import type { HttpContext } from '@adonisjs/core/http'
 import AIService from '#services/AIservice'

export default class AisController {

    public async suggePage({view}: HttpContext) {
    return view.render('pages/grok/createTweet')
  }

    public async suggestHashtags({ request, response }: HttpContext) {
    const { content } = request.only(['content'])
    const hashtags = await AIService.suggestHashtags(content)
    return response.json({ hashtags })
  }

  public async enrichTweet({ request, response }: HttpContext) {
    const { content } = request.only(['content'])
    const enriched = await AIService.enrichTweet(content)
    return response.json({ enriched })
  }

  public async analyzeTweet({ request, response }: HttpContext) {
    const { tweet } = request.only(['tweet'])
    const analysis = await AIService.analyzeTweet(tweet)
    return response.json({ analysis })
  }
}