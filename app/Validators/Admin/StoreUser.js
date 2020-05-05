'use strict'

class AdminStoreUser {
  get rules () {
    let userID = this.ctx.params.id //ctx = context
    let rule = ''
    //se existir o usu_id significar que o usuario esta atualizando
    if(userID){
      rule = `unique:users,email,id,${userID}`
    }else{
      rule = 'unique:users,email|required'
    }

    return {
      email: rule,
      image_id: 'exist,id'
    }
  }
}

module.exports = AdminStoreUser
