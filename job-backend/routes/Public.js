
const express = require("express")
const UserController = require("../controllers/UserController")

const public = express.Router()

public.post('/register', UserController.register)

module.exports = public