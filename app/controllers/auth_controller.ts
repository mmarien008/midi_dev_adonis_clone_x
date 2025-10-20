import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class AuthController {
  async register({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async send_email() {
    await mail.send((message) => {

      message
        .to("manimamarien08@gmail.com")
        .from('animamarien08@gmail.com')
        .subject('Verify your email address')
        .htmlView('emails/verify_email')
    })
  }
}
