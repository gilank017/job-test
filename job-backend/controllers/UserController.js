const Response = require("../helpers/Response")
const User = require("../repositories/User")
const UserValidator = require("../validators/UserValidator")

class UserController {
  async register(req, res) {
    let response = new Response()
    try {
      let requestData = await UserValidator.CheckRegister(req.body)
      let createdUser = await User.insertNewUser(requestData)
      response.setData(createdUser)
      response.setMessage("User Created Successfully")
    } catch(error) {
      response.setStatus(false)
      response.setData(error)
    }
    res.json(response)
  }

  async login(req, res) {
    let response = new Response()
    try {
      let requestData = await UserValidator.CheckLogin(req.body)
      let dataLogin = await User.login(requestData)
      res.cookie('session',dataLogin.token, {httpOnly: true})
      res.cookie('refresh_session',dataLogin.refresh_token, {httpOnly: true})
      response.setData(dataLogin)
      response.setMessage("Login Successfully")
    } catch (error) {
      response.setStatus(false)
      response.setData(error)
    }
    res.json(response)
  }

  async refreshAuthentification(req, res) {
    let response = new Response()
    try {
      let request = await User.verifyToken(req.body.refresh_token)
      response.setData(request)
    } catch(error) {
      response.setStatus(false)
      response.setData(error.message)
    }
    res.json(response)
  }
}

module.exports = new UserController