 import type { HttpContext } from '@adonisjs/core/http'
  import Tweet from '#models/tweet'
  

export default class TimeLinesController {

    async  show_data({view}:HttpContext) {

        const tweets = await Tweet.query().preload('user').orderBy("tweets.id","desc")
        return view.render('pages/time_line/show_time_line',{tweets})
        
    }
}