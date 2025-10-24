 import type { HttpContext } from '@adonisjs/core/http'
 import Tweet from '#models/tweet'

export default class TweetsController {

    async store ({request,response,auth}:HttpContext) {

        try {
            let contenu= request.input('contenu')
            let userId= auth.user?.id
            await Tweet.create({ contenu, userId })
            return response.redirect().toRoute('time_line.show_data')
            
        } catch (error) {
            return error.message
        }
        
    }

     async edite () {
        
    }
     async delete () {
        
    }

     async update () {
        
    }
}