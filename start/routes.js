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



Route.group(() => {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
    Route.get('logout', 'AuthController.logout')
}).prefix('api/v1/auth')

Route.group(() => {
    Route.get('home', 'DashboardController.dashboardSummary')
    Route.get('suppliers', 'SupplierController.index')
    Route.get('suppliers/:id', 'SupplierController.show')
    Route.post('suppliers', 'SupplierController.store')
    Route.put('suppliers/:id', 'SupplierController.update')
    Route.delete('suppliers/:id', 'SupplierController.destroy')
    Route.get('suppliers/products/:id', 'SupplierController.products')
    // Route.get('suppliers/')
}).prefix('api/v1')
// .middleware(['auth'])


Route.group(() => {
    Route.get('product/:id', 'ProductController.show')
    Route.get('product/edit/:id', 'ProductController.edit')
    Route.get('products/create/', 'ProductController.create')
    Route.delete('product/:id', 'ProductController.destroy')
    Route.get('product/supplier/:id', 'ProductController.supplier')

    Route.get('products/page/:page?', 'ProductController.index')
    Route.post('products/:id', 'ProductController.update')
    Route.post('products', 'ProductController.store')
}).prefix('api/v1')
// .middleware(['auth'])

Route.group(() => {
    Route.get('products/quantity', 'ProductQuantityController.index')
    Route.post('products/quantity', 'ProductQuantityController.store')
    Route.put('products/uantity/:id', 'ProductQuantityController.update')
}).prefix('api/v1')

