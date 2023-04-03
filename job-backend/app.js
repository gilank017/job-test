const dotenv = require("dotenv")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const env = dotenv.config().parsed

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))
app.use(bodyParser.urlencoded({
  extended: false,
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))


app.use('/', require("./routes/Public"))

app.use(function (req, res, next) {
  res.status(404).json({status: false, message: "Sorry, We don't know the endpoint target"})
})

app.listen(env.APP_PORT, () => {
  console.log(`server started on port ${env.APP_PORT}`) 
})