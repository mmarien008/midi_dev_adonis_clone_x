import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class AuthController {
  async register({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, session,response}: HttpContext) {
    const { fullName, email, password ,confirme } = await request.validateUsing(createUserValidator)

    if(password!=confirme){
      session.flash('errors', 'les deux mot de passe ne correspondent pas')
      return response.redirect().back()
    }

    let user = await User.create({ fullName, email, password })

    await this.send_email(user)
    session.flash('success', 'User registered successfully')
    return response.redirect().toRoute("home")
  }


   async send_email(user: User) {
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // await user.related('verificationCode').create({ code })
    // sauvegarde


    await mail.send((message) => {
      message
        .to(user.email)
        .from(process.env.MAIL_FROM_ADDRESS!)
        .subject('Vérifiez v otre adresse email')
        .htmlView('emails/verify_email', { fullName: user.fullName, code })
    })
  }
}
