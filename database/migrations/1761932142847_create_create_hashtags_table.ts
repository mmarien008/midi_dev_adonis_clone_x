import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hashtags'

  async up() {
    this.schema.createTable('hashtags', (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
