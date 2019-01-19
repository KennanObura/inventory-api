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

Route.on('/').render('landing')
Route.on('/register').render('register')
Route.on('/home').render('index')

Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')

Route.get('/suppliers', 'SupplierController.index')
Route.get('/suppliers/:id', 'SupplierController.show')
Route.post('/suppliers', 'SupplierController.store')
Route.put('/suppliers/:id', 'SupplierController.update')
Route.delete('/suppliers/:id', 'SupplierController.destroy').middleware('auth')
Route.get('/suppliers/products/:id', 'SupplierController.products')


Route.get('/products', 'ProductController.index')
Route.get('/products/:id', 'ProductController.show')
Route.post('/products/:id', 'ProductController.update')
Route.get('/product/edit/:id', 'ProductController.edit')
Route.delete('/product/:id', 'ProductController.destroy')
Route.post('/products', 'ProductController.store')
Route.get('/product/supplier/:id', 'ProductController.supplier')

Route.get('/api/productQuantity', 'ProductQuantityController.index')
Route.post('/api/productQuantity', 'ProductQuantityController.store')
Route.put('/api/productQuantity/:id', 'ProductQuantityController.update')
