
const express = require("express")
const JobController = require("../controllers/JobController")
const Middleware = require("../services/Middleware")

const job = express.Router()

job.get("/", Middleware(), JobController.jobList)
job.post('/create', Middleware(), JobController.createJob)
job.patch('/update', Middleware(), JobController.updateJob)
job.delete('/delete/:id', Middleware(), JobController.deleteJob)

module.exports = job