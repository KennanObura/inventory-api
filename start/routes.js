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

<<<<<<< HEAD
Route.group(() => {
    Route.get('home', 'DashboardController.dashboardSummary')
=======
Route.get('/suppliers/page/:page?', 'SupplierController.index')
Route.get('/supplier/create/', 'SupplierController.create')
Route.get('/suppliers/:id', 'SupplierController.show')
Route.post('/suppliers', 'SupplierController.store')
Route.put('/suppliers/:id', 'SupplierController.update')
Route.delete('/suppliers/:id', 'SupplierController.destroy').middleware('auth')
Route.get('/suppliers/products/:id', 'SupplierController.products')
>>>>>>> f1b7cf802bfdefed2fa9dfae8963921ef6631c49


    Route.get('suppliers', 'SupplierController.index')
    Route.get('suppliers/:id', 'SupplierController.show')
    Route.post('suppliers', 'SupplierController.store')
    Route.put('suppliers/:id', 'SupplierController.update')
    Route.delete('suppliers/:id', 'SupplierController.destroy').middleware('auth')
    Route.get('suppliers/products/:id', 'SupplierController.products')
}).prefix('api/v1').middleware(['auth'])


Route.group(() => {
    Route.get('/product/:id', 'ProductController.show')
    Route.get('/product/edit/:id', 'ProductController.edit')
    Route.get('/products/create/', 'ProductController.create')
    Route.delete('/product/:id', 'ProductController.destroy')
    Route.get('/product/supplier/:id', 'ProductController.supplier')

    Route.get('/products/page/:page?', 'ProductController.index')
    Route.post('/products/:id', 'ProductController.update')
    Route.post('/products', 'ProductController.store')
}).prefix('api/v1').middleware(['auth'])

Route.get('/api/productQuantity', 'ProductQuantityController.index')
Route.post('/api/productQuantity', 'ProductQuantityController.store')
Route.put('/api/productQuantity/:id', 'ProductQuantityController.update')
