import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commentaires'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string("contenu").notNullable()
      table.integer('nombre_reponse').defaultTo(0)
      table.integer('nombre_like').defaultTo(0)
      table.integer("tweet_id").unsigned().references("tweets.id").onDelete('CASCADE')
      table.integer("user_id").unsigned().references("users.id").onDelete('CASCADE')
      table.integer("commentaire_id").unsigned().references("commentaires.id").onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}