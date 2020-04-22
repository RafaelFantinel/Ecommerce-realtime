'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Object} ctx.pagination
   */
  async index({ request, response, view, pagination }) {
    const  name  = request.input('name')
    const query = User.query();

    if (name) {
      query.where('name', 'ILIKE', `%${name}%`);
      query.orWhere('surname', 'ILIKE', `%${name}%`);
      query.orWhere('email', 'ILIKE', `%${name}%`);
    }
    const users = await query.paginate(pagination.page, pagination.limit);
    return response.send(users)
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try{
      const userData = request.only(['name',
      'surname',
      'email',
      'password'
    ])
    const user = await User.create(userData)
    return response.status(201).send(user)
    }catch(error){
      return response.status(400).send({ message : 'Não foi possivel criar o Usuario'})
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params:{ id }, request, response, view }) {

    const user = await User.findOrFail(id)
    return response.send(user)
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id}, request, response }) {
    const user = await User.findOrFail(id)


    const userData  = request.only([
    'name', 
    'surname',
    'email',
    'password',
    'image_id'
  ])

  user.merge(userData)

  await user.save()
  return response.send(user)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params:{ id}, request, response }) {
    const user = await User.findOrFail(id)
    try {
      await user.delete()
      return response.status(204).send()
      
    } catch (error) {
      return status(500).send({message: 'Não foi possivel deletar ao usuario'})
    }
  }
}

module.exports = UserController
