import type { HttpContext } from '@adonisjs/core/http'
import Commentaire from '#models/commentaire'

export default class CommentairesController {
  async store({ request, auth ,response}: HttpContext) {
    try {
      let contenu = request.input('contenu')
      let tweetId = request.input('id_tweet')
      let userId = auth.user?.id

      Commentaire.create({ contenu, tweetId, userId })

        return response.redirect().toRoute('time_line.show_data')
    } catch (error) {
return error.message
    }
  }
}
