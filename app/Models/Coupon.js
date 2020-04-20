'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Coupon extends Model {
  static get dates () {
    return ['created_at', 'updated_at', 'valid_from', 'valid_until']
  }

  users () {
    return this.belongsToMany('App/Models/User')
  }

  Products () {
    return this.belongsToMany('App/Models/Product')
  }

  Orders () {
    return this.belongsToMany('App/Models/Order')
  }
}

module.exports = Coupon