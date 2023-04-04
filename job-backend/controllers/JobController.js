const Response = require("../helpers/Response")
const Job = require("../repositories/Job")
const JobValidator = require("../validators/JobValidator")

class JobController {
  async jobList(req, res) {
    let response = new Response()
    try {
      let getDataJob = await Job.getListJob()
      response.setData(getDataJob)
      response.setMessage("Success")
    } catch (error) {
      response.setStatus(false)
      response.setData(error)
    }
    res.json(response)
  }

  async createJob(req, res) {
    let response = new Response()
    try {
      let requestData = await JobValidator.CheckJob(req.body)
      let createdJob = await Job.insertNewJob(requestData)
      response.setData(createdJob)
      response.setMessage("Job Created Successfully")
    } catch (error) {
      response.setStatus(false)
      response.setData(error)
    }
    res.json(response)
  }
  
  async updateJob(req, res) {
    let response = new Response()
    try {
      let requestData = await JobValidator.CheckJob(req.body)
      let updatedJob = await Job.updateDataJob(req.query.job_id ,requestData)
      response.setData(updatedJob)
      response.setMessage("Job Updated Successfully")
    } catch (error) {
      response.setStatus(false)
      response.setData(error)
    }
    res.json(response) 
  }

  async deleteJob(req, res) {
    let response = new Response()
    try {
      await Job.deleteDataJob(req.params.id)
      response.setMessage("Job Delete Successfully")
    } catch (error) {
      response.setStatus(false)
      response.setData(error.meta.cause)
    }
    res.json(response) 
  }
}

module.exports = new JobController