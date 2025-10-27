import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import type { HasMany } from '@adonisjs/lucid/types/relations'
import { hasMany } from '@adonisjs/lucid/orm'

import User from '#models/user'
import Commentaire from '#models/commentaire'
import LikeTweet from './like_tweet.js'

export default class Tweet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare contenu: string



  @column()
  declare nombre_like: number | null

  @column()
  declare nombre_reponse: number | null

  @column()
  declare nombre_partage: number | null

  @column()
  declare photo: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Commentaire)
  declare commentaires: HasMany<typeof Commentaire>

  @hasMany(() => LikeTweet)
  declare likeTweets: HasMany<typeof LikeTweet>

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
