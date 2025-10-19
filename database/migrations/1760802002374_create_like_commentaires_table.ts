import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'like_commentaires'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer("user_id").unsigned().references("users.id")

      table.integer("commentaire_id").unsigned().references("commentaires.id")

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}