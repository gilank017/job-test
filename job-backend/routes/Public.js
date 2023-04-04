
const express = require("express")
const UserController = require("../controllers/UserController")
const Middleware = require("../services/Middleware")

const public = express.Router()

public.post('/register', UserController.register)
public.post('/login', UserController.login)
public.post('/refresh-token', Middleware(), UserController.refreshAuthentification)

module.exports = public