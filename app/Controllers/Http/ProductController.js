'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product');
const Database = use('Database')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let products = await Database
    .select('*')
    .from('products')

    .leftJoin('suppliers', 'suppliers.id', 'products.supplier_id')
    return response.json(products)
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const prod_name = request.input('prod_name')
    const prod_coo = request.input('prod_coo')
    const prod_yom = request.input('prod_yom')
    const prod_quality = request.input('prod_quality')
    const prod_patno = request.input('prod_patno')
    const prod_model = request.input('prod_model')
    const supplier_id = request.input('supplier_id')

    let product = new Product()
    product.prod_name = prod_name
    product.prod_patno = prod_patno
    product.prod_coo = prod_coo
    product.prod_yom = prod_yom
    product.prod_quality = prod_quality
    product.supplier_id = supplier_id
    product.prod_model = prod_model

    await product.save()
    return response.json(product)


  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  async supplier({ params, request, response }){
    const product = await Product.find(params.id)
    const supplier = await product.supplier().fetch()

    return response.json(supplier)
  }
}

module.exports = ProductController
