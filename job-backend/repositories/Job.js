const Prisma = require("../services/Prisma")

const Job = {
  getListJob: async () => {
    let response = await Prisma.jobs.findMany()
    if (response) {
      return response
    }
    throw {
      reason: ["internal server error"]
    }
  },
  insertNewJob: async (job) => {
    const body = {
      name: job.name,
      description: job.description,
      min_education: job.min_education,
      created_date: new Date(job.created_date).toISOString(),
      expired_date: new Date(job.expired_date).toISOString(),
      quota: job.quota
    }
    let response = await Prisma.jobs.create({ data: body })
    if (response) {
      return response
    }
    throw {
      reason: ["internal server error"]
    }
  },
  updateDataJob: async (jobId ,dataJob) => {
    const body = {
      name: dataJob.name,
      description: dataJob.description,
      min_education: dataJob.min_education,
      created_date: new Date(dataJob.created_date).toISOString(),
      expired_date: new Date(dataJob.expired_date).toISOString(),
      quota: dataJob.quota
    }
    let checkId = await Prisma.jobs.findUnique({
      where: {
        id: Number(jobId)
      }
    })
    if (checkId) {
      let update = await Prisma.jobs.update({
        where: {
          id: Number(jobId)
        },
        data: body
      })
      if (update) {
        return update
      }
      throw {
        message: "Internal Server Error"
      }
    }
    throw {
      message: "Job not found"
    }
  },
  deleteDataJob: async (jobId) => {
    let response = await Prisma.jobs.delete({
      where: {
        id: Number(jobId)
      }
    })
    if (response) {
      return
    }
    throw {
      reason: ["internal server error"]
    }
  }
}

module.exports = Job