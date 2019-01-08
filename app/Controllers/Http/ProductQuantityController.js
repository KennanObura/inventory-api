'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const ProductQuantity = use('App/Models/ProductQuantity')
const Database = use('Database')
/**
 * Resourceful controller for interacting with productquantities
 */
class ProductQuantityController {
  /**
   * Show a list of all productquantities.
   * GET productquantities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const data = await Database.raw('select * from product_quantities')
    return response.json(data)

  }

  /**
   * Render a form to be used for creating a new productquantity.
   * GET productquantities/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new productquantity.
   * POST productquantities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const stock = request.input('stock')
    const product_id = request.input('product_id')

    let productQuantity = new ProductQuantity()
    productQuantity.stock = stock
    productQuantity.product_id = product_id

    await productQuantity.save()
    return response.json(productQuantity)

  }

  /**
   * Display a single productquantity.
   * GET productquantities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing productquantity.
   * GET productquantities/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update productquantity details.
   * PUT or PATCH productquantities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {

    let quantity = await Database
    .select('stock')
    .from('product_quantities')
    .where({ product_id: params.id })
    .orderBy('id', 'desc')
    .limit(1)
    
    let productQuantity = new ProductQuantity()
   
    productQuantity.stock = (quantity[0].stock - 1)
    productQuantity.product_id = params.id

    await productQuantity.save()
    return response.json(productQuantity)
  }

  /**
   * Delete a productquantity with id.
   * DELETE productquantities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ProductQuantityController
