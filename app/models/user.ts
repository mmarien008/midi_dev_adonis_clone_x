import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

import type { ManyToMany } from '@adonisjs/lucid/types/relations'

import Tweet from '#models/tweet'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Commentaire from '#models/commentaire'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare nombre_abonnement: number

  @column()
  declare nombre_abonnee: number

  @column()
  declare is_verify: boolean | null

  @column()
  declare photo: string | null

  @column()
  declare date_naissance: Date | null

  @manyToMany(() => User, {
    pivotTable: 'suivis',
    localKey: 'id',
    pivotForeignKey: 'suiveur_id',
    pivotRelatedForeignKey: 'suivi_id',
  })
  declare user_abonnements: ManyToMany<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'suivis',
    localKey: 'id',
    pivotForeignKey: 'suivi_id',
    pivotRelatedForeignKey: 'suiveur_id',
  })
  declare user_abonnes: ManyToMany<typeof User>

  @manyToMany(() => Tweet, {
    pivotTable: 'partages',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'tweet_id',
  })
  declare partages: ManyToMany<typeof Tweet>

  @manyToMany(() => Tweet, {
    pivotTable: 'like_tweets',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'tweet_id',
  })
  declare like_tweets: ManyToMany<typeof Tweet>

  @manyToMany(() => Commentaire, {
    pivotTable: 'like_commentaires',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'commentaire_id',
  })
  declare like_commentaires: ManyToMany<typeof Commentaire>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Tweet)
  declare tweets: HasMany<typeof Tweet>

  @hasMany(() => Commentaire)
  declare commentaires: HasMany<typeof Commentaire>
}
