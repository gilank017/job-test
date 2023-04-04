const Validator = require("./Validator")

class JobValidator {
  static async CheckJob(dataJob) {
    let rules = [
      {
        key: "name",
        value: dataJob.name,
        rules: ['required']
      },
      {
        key: "description",
        value: dataJob.description,
        rules: ['required']
      },
      {
        key: "min_education",
        value: dataJob.min_education,
        rules: ['required']
      },
      {
        key: "created_date",
        value: dataJob.created_date,
        rules: ['required']
      },
      {
        key: "expired_date",
        value: dataJob.expired_date,
        rules: ['required']
      },
      {
        key: 'quota',
        value: dataJob.quota,
        rules: ['required', 'number']
      }
    ]
    return await Validator.check(rules)
  }
}

module.exports = JobValidator