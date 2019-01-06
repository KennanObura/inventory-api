'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SupplierSchema extends Schema {
  up () {
    this.create('suppliers', (table) => {
      table.increments()
      table.string('name')
      table.string('address')
      table.string('coo')
      table.string('city')
      table.string('tel')
      table.timestamps()

      table.integer('user_id').unsigned().references('id').inTable('users');
    })
  }

  down () {
    this.drop('suppliers')
  }
}

module.exports = SupplierSchema
