import User from '#models/user'
import VerifyCode from '#models/verify_code'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'

export default class AuthController {
  async register({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, session, response }: HttpContext) {
    const { fullName, email, password, confirme } = await request.validateUsing(createUserValidator)

    if (password != confirme) {
      session.flash('errors', 'les deux mot de passe ne correspondent pas')
      return response.redirect().back()
    }

    let user = await User.create({ fullName, email, password })

    await this.send_email(user)
    session.flash('success', 'User registered successfully')
    return response.redirect().toRoute('verify.page')
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

  async verify_code({ request, session, response}: HttpContext) {
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
  }
}
