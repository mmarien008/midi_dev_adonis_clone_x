import type { HttpContext } from '@adonisjs/core/http'
import Tweet from '#models/tweet'
import string from '@adonisjs/core/helpers/string'


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

      }

      let contenu = request.input('contenu')
      let userId = auth.user?.id
      await Tweet.create({ contenu, userId, photo: `/uploads/${newName}` })
      return response.redirect().toRoute('time_line.show_data')
    } catch (error) {
      return error.message
    }
  }

 
  async delete({ params,response}: HttpContext) {

    try {
        let tweet= await Tweet.findOrFail(params.id)
        tweet.delete()
         return response.redirect().toRoute('time_line.show_data')
        
    } catch (error) {
        return response.redirect().back()
        
    }

  }

   async edite() {
    
  }

  async update() {}
}
