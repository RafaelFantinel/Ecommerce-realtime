'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const ImageTransformer = use('App/Transformer/Admin/ImageTransformer')
/**
 * ProdcutTransformer class
 *
 * @class ProdcutTransformer
 * @constructor
 */
class ProdcutTransformer extends TransformerAbstract {
  defaultInclude() {
    return ['image']
  }

  transform(model) {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      price: model.price
    }
  }
  includeImage(model) {
    return this.item(model.getRelated('image'), ImageTransformer)
  }
}

module.exports = ProdcutTransformer
