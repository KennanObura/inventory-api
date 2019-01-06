'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    supplier(){
        return this.belongsTo('App/Models/Supplier');
    }

    productQuantity(){
        return this.hasMany('App/Models/ProductQuantity')
    }

    // static get dates () {
    //     return super.dates.concat(['prod_yom'])
    //   }
}

module.exports = Product
