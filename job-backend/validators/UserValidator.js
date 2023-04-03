const { PrismaClient } = require("@prisma/client")
const Validator = require("./Validator")

const prisma = new PrismaClient()

class UserValidator {
  static async CheckRegister(userData) {
    let model = await prisma.user
    let rules = [
      {
        key: "name",
        value: userData.name,
        rules: ['required']
      },
      {
        key: "email",
        value: userData.email,
        model: model,
        rules:  ['lowercase', 'trim', 'required', 'email', 'email-exist']
      },
      {
        key: "password",
        value: userData.password,
        rules: ['required']
      },
    ]
    return await Validator.check(rules)
  }
}

module.exports = UserValidator