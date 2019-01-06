'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductQuantitySchema extends Schema {
  up () {
    this.create('product_quantities', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_quantities')
  }
}

module.exports = ProductQuantitySchema
