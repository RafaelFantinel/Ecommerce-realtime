'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use('App/Models/Category');
const Transformer = use('App/Transformers/Admin/CategoryTransformer')

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Object} ctx.pagination
   */
  async index ({ request, response, view, pagination, transform }) {

    const  title  = request.input('title')
    const query = Category.query()

    if(title){
      query.where('title','ILIKE',`%${title}%`)
    }

    var categories = await query.paginate(pagination.page,pagination.limit)//Pagina 1 e limit 10
    categories = await transform.paginate(categories, Transformer )
    return response.send(categories)
  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { title, description , image_id } = request.all();
      const category = await Category.create({ title, description , image_id})
      return response.status(201).send(category)  
    } catch (error) {
      return response.status(400).send({
        message: 'Erro ao processar a sua solicitação!'
      })
    }
    
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id }, request, response, view }) {
    const category = await Category.findOrFail(id);
    return response.send(category)
  }

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    const category = await Category.findOrFail(id)
    const { title,description,image_id} = request.all()
    category.merge({ title, description , image_id })
    await category.save()
    return response.send(category)
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params:{ id }, request, response }) {
    const category = await Category.findOrFail(id)
    await category.delete()
    return response.status(204).send()
  }
}

module.exports = CategoryController
