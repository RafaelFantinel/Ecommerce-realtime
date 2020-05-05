'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * ImageTransformer class
 *
 * @class ImageTransformer
 * @constructor
 */
class ImageTransformer extends TransformerAbstract {
  transform (image) {
    image = image.toJSON();
    return {
      id: Image.id,
      url: Image.url,
      size: image.size,
      original_name: image.original_name,
      extension: image.extension
    }
  }
}

module.exports = ImageTransformer
