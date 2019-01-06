'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    supplier(){
        return this.belongsTo('App/Models/Supplier');
    }

    // static get dates () {
    //     return super.dates.concat(['prod_yom'])
    //   }
}

module.exports = Product
