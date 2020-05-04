'use_strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    //Categories resource routes
    Route.resource('categories', 'CategoryController').apiOnly()


    //Product resource routes
    Route.resource('products', 'ProductController').apiOnly()

    //Coupon Resource Routes
    Route.resource('coupons', 'CouponController').apiOnly()

    //Routes To Remove And Apply Discounts
    Route.post('orders/:id/discount', 'OrderController.applyDiscount')
    Route.delete('orders/:id/discount', 'OrderController.removeDiscount')

    //Order Resource Routes
    Route.resource('orders', 'OrderController').apiOnly()

    //Image Resource Routes
    Route.resource('images', 'ImageController').apiOnly()

    //User Resource Routes
    Route.resource('users', 'UserController').apiOnly()
})
    .prefix('v1/admin')
    .namespace('Admin')