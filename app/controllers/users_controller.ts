import User from '#models/user'
import Suivi from '#models/suivi'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async show_profil({ view, params, auth}: HttpContext) {
    try {
      let suiveurId = auth.user?.id
   
      const user = await User.query()
        .where('id', params.id)
        .preload('tweets', (user) => {
          user.preload('user').preload('commentaires', (commentsQuery) => {
            commentsQuery.preload('user')
          })
        })
        .firstOrFail()

      let is_follow = false

      if (suiveurId) {
        const suivi = await Suivi.query()
          .where('suiveurId', suiveurId)
          .where('suiviId', params.id)
          .first()

        is_follow = !!suivi
      }

      return view.render('pages/user/profile', {
        is_follow,
        user,
      })
    } catch (error) {
      return error.message
    }
  }

  // private async users_tweets() {

  // }

  async suivre({ response, params, auth }: HttpContext) {
    try {
      // la personne qui suis
      const suiveurId = auth.user?.id
      const userSuiveur =await User.findOrFail(suiveurId)

        // la personne qui est suivis
      const user = await User.findOrFail(params.id)
      user.nombre_abonnee += 1
      userSuiveur.nombre_abonnement+=1
      userSuiveur.save()

      user.save()
      Suivi.create({ suiveurId, suiviId: params.id })
      return response.redirect().back()
    } catch (error) {
      return error.message
    }
  }
  async nonSuivre({ response, params,auth }: HttpContext) {
    try {
      // la personne qui suis
       const suiveurId = auth.user?.id
       const userSuiveur =await User.findOrFail(suiveurId)
        userSuiveur.nombre_abonnement-=1
      userSuiveur.save()

      // la personne qui est suivis

      const user = await User.findOrFail(params.id)
      user.nombre_abonnee -= 1
      user.save()

       if (suiveurId) {
        const suivi = await Suivi.query()
          .where('suiveurId', suiveurId)
          .where('suiviId', params.id)
          .first()
          suivi?.delete()
      }
    

      return response.redirect().back()
    } catch (error) {
      return error.message
    }
  }
}
