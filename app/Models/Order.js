'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
    user() {
        return this.belongsTo('App/Models/user','user_id','id')
    }
    items() {
        return this.hasMany('App/Models/OrderItem')
    }

    coupons() {
        return this.belongsToMany('App/Models/Coupon')
    }
    discount() {
        return this.hasMany('App/Models/Discount')
    }
}

module.exports = Order
