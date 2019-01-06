'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('prod_name')
      table.string('prod_patno').unique()
      table.string('prod_coo')
      table.string('prod_quality')
      table.string('prod_yom')
      table.string('prod_model')
      table.timestamps()

      table.integer('supplier_id').unsigned().references('id').inTable('suppliers');
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
