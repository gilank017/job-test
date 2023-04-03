const Response = require("../helpers/Response")
const User = require("../repositories/User")
const UserValidator = require("../validators/UserValidator")

class UserController {
  async register(req, res) {
    let response = new Response
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
}

module.exports = new UserController