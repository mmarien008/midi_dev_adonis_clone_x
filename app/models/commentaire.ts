import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import Tweet from '#models/tweet'

export default class Commentaire extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare contenu: string

  @column()
  declare nombre_like: number | null

  @column()
  declare nombre_reponse: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: number

  @column()
  declare tweetId: number


  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Tweet)
  declare tweet: BelongsTo<typeof Tweet>

  @belongsTo(() => Commentaire, {
    foreignKey: 'commentaireId',
  })
  declare Commentaire_parent: BelongsTo<typeof Commentaire>
}
