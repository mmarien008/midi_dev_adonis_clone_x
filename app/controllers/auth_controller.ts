import User from '#models/user'
import VerifyCode from '#models/verify_code'
import { createUserValidator, loginUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'

export default class AuthController {
  async register({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, session, response }: HttpContext) {
    try {
      const { fullName, email, password, confirme } =
        await request.validateUsing(createUserValidator)

      if (password != confirme) {
        session.flash('errors', 'les deux mot de passe ne correspondent pas')
        return response.redirect().back()
      }

      await User.create({ fullName, email, password })

       //await this.send_email(user)
       session.flash('success', 'User registered successfully')
    
       return response.redirect().toRoute('verify.page')
    } catch (error) {
      session.flash('errors', 'error du serveur')
      return response.redirect().back()
    }
  }

  async send_email(user: User) {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    await VerifyCode.updateOrCreate(
      { userId: user.id },
      {
        code,
        isUsed: false,
        expiresAt: DateTime.now().plus({ minutes: 10 }),
      }
    )
    await mail.send((message) => {
      message
        .to(user.email)
        .from(process.env.MAIL_FROM_ADDRESS!)
        .subject('Vérifiez votre adresse email')
        .htmlView('emails/verify_email', { fullName: user.fullName, code })
    })
  }

  async verify_page({ view }: HttpContext) {
    return view.render('emails/insert_message_confirme')
  }

  async verify_code({ request, session, response }: HttpContext) {
    try {
      const code = request.input('code')
      const verifyCode = await VerifyCode.query()
        .where('code', code)
        .andWhere('is_used', false)
        .first()

      if (!verifyCode) {
        session.flash('errors', 'Code invalide ou déjà utilisé.')
        return response.redirect().back()
      }

      if (verifyCode.expiresAt < DateTime.now()) {
        session.flash('errors', 'Ce code a expiré. Veuillez demander un nouveau code.')
        return response.redirect().back()
      }

      verifyCode.isUsed = true
      await verifyCode.save()

      const user = await verifyCode.related('user').query().first()
      if (user) {
        user.is_verify = true
        await user.save()
      }

      session.flash('success', 'Votre compte a été vérifié avec succès !')
      return response.redirect().toRoute('home')
    } catch (error) {
      session.flash('errors', 'error du serveur')
      return response.redirect().back()
    }
  }

  async login({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async logigStep2({ request, view, session, response }: HttpContext) {
    try {
      let email = await request.input('email')
      return view.render('pages/auth/login_step2', { email })
    } catch (error) {
      session.flash('errors', 'error du serveur')
      return response.redirect().back()
    }
  }

  async toLogin({ request, response, auth, session }: HttpContext) {
    try {

      let { email, password } = await request.validateUsing(loginUserValidator)

      let user = await User.verifyCredentials(email, password)

       //if (user.$attributes.is_verify == false) {
        //session.flash('errors', 'compte non verifié')
        // return response.redirect().toRoute('auth.login')
      // }
      await auth.use('web').login(user)
      return response.redirect().toRoute('time_line.show_data')
    } catch (error) {
      session.flash('notification', {
        type: 'error',
        message: error.message || 'erreur mot de passe ou email incorecte.',
      })
      return error.message
    }
  }

  async logout({ auth,response }: HttpContext) {
    await auth.use('web').logout()
     return response.redirect().toRoute('auth.login')
  }
}
