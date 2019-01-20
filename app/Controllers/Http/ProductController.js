'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product');
const Suppliers = use('App/Models/Supplier')
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
  async index({ request, response, view, params }) {

    let page = params.page ? params.page : 1;

    // const quantity =  await Database
    // .select('stock')
    // .from('product_quantities')
    // .where({ product_id: 'products.id' })
    // .orderBy('id', 'desc')
    // .limit(1)


    const products = await Database
    .select('products.*','suppliers.name')
    .from('products')
    .leftJoin('suppliers', 'suppliers.id', 'products.supplier_id')
    .orderBy('id', 'Desc')
    .paginate(page, 5)


    // .whereIn('id', quantity)
    // return response.json(products)
    let results = products

    return view.render('layouts.products-main', { products: results })
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

    const suppliers = await Suppliers.all()

  // return response.json('suppliers')

    return view.render('layouts.products.create', {suppliers: suppliers.toJSON()})
    

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
    return response.redirect('/products/page/?')


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

    const product = await Product.find(params.id)
    const suppliers = await Suppliers.all()
    // return response.json(product)
    return view.render('layouts.products.edit', {product: product.toJSON(), suppliers: suppliers.toJSON()})
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
    const prod_name = request.input('prod_name')
    const prod_coo = request.input('prod_coo')
    const prod_yom = request.input('prod_yom')
    const prod_quality = request.input('prod_quality')
    const prod_patno = request.input('prod_patno')
    const prod_model = request.input('prod_model')
    const supplier_id = request.input('supplier_id')

    let product = await Product.find(params.id)
    product.prod_name = prod_name
    product.prod_patno = prod_patno
    product.prod_coo = prod_coo
    product.prod_yom = prod_yom
    product.prod_quality = prod_quality
    product.supplier_id = supplier_id
    product.prod_model = prod_model

    await product.save()
    
    // session.flash({ message: 'Your job has been updated. '});
    return response.redirect('/products');
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
    await Product.find(params.id).delete()

    return response.redirect('/products')
  }

  async supplier({ params, request, response }){
    const product = await Product.find(params.id)
    const supplier = await product.supplier().fetch()

    return response.json(supplier)
  }
}

module.exports = ProductController
