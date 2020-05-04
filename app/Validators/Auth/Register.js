'use strict'

class AuthRegister {
  get rules () {
    return {
      name:'required',
      surname: 'required',
      email: 'required|email|unique:users,email',//unique:tabela,coluna
      password: 'required|confirmed'//Confirmed = confirmação de senha
    }
  }
}

module.exports = AuthRegister
