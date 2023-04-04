const Prisma = require("../services/Prisma")
const Bcrypt = require("../helpers/Bcrypt")
const Jwt = require("../helpers/Jwt")

const User = {
  insertNewUser: async (user) => {
    const body = {
      name: user.name,
      email: user.email,
      password: await Bcrypt.encrypt(user.password)
    }
    let response = await Prisma.user.create({ data: body })
    if (response) {
      return {
        name: response.name,
        email: response.email
      }
    }
    throw {
      reason: ["internal server error"]
    }
  },
  login: async (user) => {
    let checkEmail = {
      email: user.email
    }
    let response = await Prisma.user.findUnique({ where: checkEmail })
    if (response) {
      let validatePassword = await Bcrypt.check(user.password, response.password)
      if (validatePassword) {
        let accessToken = await Jwt.generate({ id: response.id })
        let refreshToken = await Jwt.refresh({ id: response.id })
        return {
          name: response.name,
          email: response.email,
          token: accessToken,
          refresh_token: refreshToken
        }
      }
      throw {
        message: "Invalid Password"
      }
    }
    throw {
      message: "Email not registered"
    }
  },
  verifyToken: async (payload) => {
    if (payload) {
      let verify = await Jwt.verify(payload)
      if (verify) {
        let token = { id: verify.id }
        let accessToken = await Jwt.generate(token)
        let refreshToken = await Jwt.refresh(token)
        return {
          accessToken,
          refreshToken
        }
      }
      throw {
        message: "Unauthorized"
      }
    }
    throw {
      message: "Refresh token is required"
    }
  }
}

module.exports = User