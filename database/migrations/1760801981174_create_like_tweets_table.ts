import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'like_tweets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer("user_id").unsigned().references("users.id")
      table.integer("tweet_id").unsigned().references("tweets.id")
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}