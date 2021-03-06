'use strict'



/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Supplier = use('App/Models/Supplier');
const Database = use('Database')

/**
 * Resourceful controller for interacting with suppliers
 */
class SupplierController {
  /**
   * Show a list of all suppliers.
   * GET suppliers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, params }) {

    let page = params.page? params.page : 1
    let suppliers =  await Database
    .select('*')
    .from('suppliers')
    .orderBy('id', 'Desc')
    .paginate(page, 5)

    // return response.json(suppliers)
    return view.render('layouts.suppliers-main', { suppliers: suppliers })
    
  }

  /**
   * Render a form to be used for creating a new supplier.
   * GET suppliers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {

    return view.render('layouts.suppliers.create')

  }

  /**
   * Create/save a new supplier.
   * POST suppliers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, session }) {
    const name = request.input('name')
    const address = request.input('address')
    const comments = request.input('comments')
    const city = request.input('city')
    const tel = request.input('tel')
    const user_id = request.input('user_id')

    let supplier = new Supplier()
    supplier.name = name
    supplier.city = city
    supplier.address = address
    supplier.comments = comments
    supplier.tel = tel
    supplier.user_id = 1

    await supplier.save()
    return response.route('/suppliers/page/')
  }

  /**
   * Display a single supplier.
   * GET suppliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const supplier = await Supplier.find(params.id)
    return response.json(supplier)
  }

  /**
   * Render a form to update an existing supplier.
   * GET suppliers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update supplier details.
   * PUT or PATCH suppliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const name = request.input('name')
    const address = request.input('address')
    const coo = request.input('coo')
    const city = request.input('city')
    const tel = request.input('tel')
    const user_id = request.input('user_id')

    let supplier = await Supplier.find(params.id)
    supplier.name = name
    supplier.city = city
    supplier.address = address
    supplier.coo = coo
    supplier.tel = tel
    supplier.user_id = user_id

    await supplier.save()
    return response.json(supplier)
  }

  /**
   * Delete a supplier with id.
   * DELETE suppliers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    await Supplier.find(params.id).delete()
    return response.json({ message: 'supplier deleted' })
  }

  async products({ params, request, response }) {

    try {
      const supplier = await Supplier.find(params.id)
      const products = await supplier.products().fetch()

      return response.json(products)
    } catch (error) {
      return response.json('No product found')
    }




  }
}

module.exports = SupplierController
