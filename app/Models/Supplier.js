'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Supplier extends Model {
    products(){
        return this.hasMany('App/Models/Product')
    }

    user(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Supplier
