'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    //Imagem de destaque do Produto
    image() {
        return this.belongsTo9('App/Models/Image')
    }

    //Relacionamento entre Produto e Imagens
    //Galeria de Imagens do Produto
    images() {
        return this.belongsToMany('App/Models/Image')
    }
    //Relacionamento entre Produtos e Categorias
    categories() {
        return this.belongsToMany('App/Models/Categorie')
    }
    //Realacionamento entre Produtos e Cupons de desconto
    coupons(){
        return this.belongsToMany('App/Models/Coupon')
    }
}

module.exports = Product
