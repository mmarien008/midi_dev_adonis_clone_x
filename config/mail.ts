import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'


const mailConfig = defineConfig({
  default: 'smtp',

  from: {
    address: env.get('MAIL_FROM_ADDRESS')!, // le "!" force le type string
    name: env.get('MAIL_FROM_NAME')!,
  },

  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST')!,     
      port: Number(env.get('SMTP_PORT')), 
      secure: false,                 
      auth: {
        type: 'login',
        user: env.get('SMTP_USERNAME')!, 
        pass: env.get('SMTP_PASSWORD')!, 
      },
    }),
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
