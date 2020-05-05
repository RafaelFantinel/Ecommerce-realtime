'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')

/**
 * CategoryTransformer class
 *
 * @class CategoryTransformer
 * @constructor
 */
class CategoryTransformer extends TransformerAbstract {
  //Passa o valor da imagem passado no metodo includeImage
  defaultInclude() {
    return ['image']
  }

  transform(model) {
    return {
      id: model.id,
      title: model.title,
      description: model.description
    }
  }
  includeImage(model){
    //Relacionamento entre item e imagem
    return this.item(model.getRelated('image'),ImageTransformer)
  }
}

module.exports = CategoryTransformer
