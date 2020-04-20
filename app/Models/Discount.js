'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Discount extends Model {
  static get table () {
    return 'coupon_order'
  }

  order () {
    // PK order_id
    // Nome da PK na tabela de order é id
    // Primeiro parametro é o Model, o segundo é o campo
    // na tabela que contém o valor da PK na tabela deles
    return this.belongsTo('App/Models/Order', 'order_id', 'id')
  }

  coupon () {
    return this.belongsTo('App/Models/Coupon', 'coupon_id', 'id')
  }
}

module.exports = Discount
