'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name',200).notNullable()
      table.integer('image_id').unsigned()
      table.text('description')
      table.decimal('price',12,2)//Maximo 12 e maximo 2 campos apos a virgula
      table.timestamps()

      table.foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
    })

    this.create('image_product',table=>{
      table.increments()
      table.integer('image_id').unsigned()
      table.integer('product_id').unsigned()
      table.foreign('image_id')
      table.foreign('image_id')
      .references('id')
      .inTable('images')
      .onDelete('cascade')

      table.foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('cascade')

        table.timestamps()

    })
    this.create('category_product', table => {
      table.increments()
      table.integer('product_id').unsigned()
      table.integer('category_id').unsigned()
      

      table.foreign('product_id')
      .references('id')
      .inTable('products')
      .onDelete('cascade')

      table.foreign('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('category_product')
    this.drop('image_product')
    this.drop('products')
    
    
  }
}

module.exports = ProductSchema
