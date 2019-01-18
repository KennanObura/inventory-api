'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index')

Route.post('/api/auth/register', 'AuthController.register')
Route.post('/api/auth/login', 'AuthController.login')

Route.get('/api/suppliers', 'SupplierController.index')
Route.get('/api/suppliers/:id', 'SupplierController.show')
Route.post('/api/suppliers', 'SupplierController.store')
Route.patch('/api/suppliers/:id', 'SupplierController.update')
Route.delete('/api/suppliers/:id', 'SupplierController.destroy').middleware('auth')
Route.get('/api/suppliers/products/:id', 'SupplierController.products')


Route.get('/api/products', 'ProductController.index')
Route.get('/api/products/:id', 'ProductController.show')
Route.post('/api/products', 'ProductController.store')
Route.get('/api/product/supplier/:id', 'ProductController.supplier')
