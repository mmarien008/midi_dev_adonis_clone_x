 import type { HttpContext } from '@adonisjs/core/http'

export default class TimeLinesController {

    async  show_data({view}:HttpContext) {

        return view.render('pages/time_line/show_time_line')
        
    }
}