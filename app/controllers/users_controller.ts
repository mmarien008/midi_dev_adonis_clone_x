import User from '#models/user'
import Suivi from '#models/suivi'
import type { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'

export default class UsersController {
  async show_profil({ view, params, auth }: HttpContext) {
    try {
      let is_follow = false

      const suiveurId = auth.user?.id
      const abonnements = await User.query().where('id', params.id).preload('user_abonnements')
      const abonnees = await User.query().where('id', params.id).preload('user_abonnes')

      const user = await User.query()
        .where('id', params.id)
        .preload('tweets', (user) => {
          user.preload('user').preload('commentaires', (commentsQuery) => {
            commentsQuery.preload('user')
          }).preload('commentaires', (commentsQuery) => {
        commentsQuery.preload('user').preload('LikeCommentaires')
      }).preload('likeTweets')  .preload('retweets')
      .preload('hashtags')
      .orderBy('tweets.id', 'desc')
        })
        .firstOrFail()

      if (suiveurId) {
        const suivi = await Suivi.query()
          .where('suiveurId', suiveurId)
          .where('suiviId', params.id)
          .first()
        is_follow = !!suivi
      }

      return view.render('pages/user/profile', {
        abonnees,
        abonnements,
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

      // la personne qui est suivis
      const user = await User.findOrFail(params.id)
      user.nombre_abonnee += 1
      user.save()

      const userSuiveur = await User.findOrFail(suiveurId)
      userSuiveur.nombre_abonnement += 1
      userSuiveur.save()

      Suivi.create({ suiveurId, suiviId: params.id })
      return response.redirect().back()
    } catch (error) {
      return error.message
    }
  }
  async nonSuivre({ response, params, auth }: HttpContext) {
    try {
      // la personne qui suis
      const suiveurId = auth.user?.id
      const userSuiveur = await User.findOrFail(suiveurId)
      userSuiveur.nombre_abonnement -= 1
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

  async edite({ params, view }: HttpContext) {
    try {
      const id_user = params.id
      const user = await User.findOrFail(id_user)

      return view.render('pages/user/edite', {
        user,
      })
    } catch (error) {
      return error.message
    }
  }

  async update({ params, response, request }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const fileTemp = request.file('photo')
      let newName = null

      if (fileTemp) {
        newName = `${string.generateRandom(32)}.${fileTemp.extname}`

        await fileTemp.move('public/uploads', {
          name: newName,
          overwrite: true,
        })
      }

      user.fullName = request.input('fullName')
      user.email = request.input('email')
      user.photo = `/uploads/${newName}`

      user.save()
        return response.redirect().toRoute('user.profile',{
          id:params.id
        })

      
    } catch (error) {
      return error.message
    }
  }
}
