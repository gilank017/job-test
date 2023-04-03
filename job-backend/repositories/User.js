const { PrismaClient } = require("@prisma/client")
const Bcrypt = require("../helpers/Bcrypt")

const prisma = new PrismaClient()

const User = {
  insertNewUser: async (user) => {
    const body = {
      name: user.name,
      email: user.email,
      password: await Bcrypt.encrypt(user.password),
      role: user.role
    }
    let response = await prisma.user.create({ data: body })
    if (response) {
      return {
        name: response.name,
        email: response.email,
        role: response.role
      }
    }
    throw {
      reason: ["internal server error"]
    }
  }
}

module.exports = User