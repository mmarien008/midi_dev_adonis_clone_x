import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import Tweet from './tweet.js'
import { manyToMany } from '@adonisjs/lucid/orm'

import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Hashtag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => Tweet, {
    pivotTable: 'hashtag_tweet',
    localKey: 'id',
    pivotForeignKey: 'hashtag_id',
    pivotRelatedForeignKey: 'tweet_id',
  })
  declare tweets: ManyToMany<typeof Tweet>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
