import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tweets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.text("contenu").notNullable()
      table.string("photo").nullable()
      table.integer("nombre_like").defaultTo(0)
      table.integer("nombre_reponse").defaultTo(0)
      table.integer("nombre_partage").defaultTo(0)

      table.integer("user_id").unsigned().references("users.id").onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}