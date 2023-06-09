const validation = require('validation')
const validator = require('validator')

class Validator {
  static async check (fields) {
    var result = {}
    var error = false
    var content = {}
    for (let i = 0; i < fields.length; i++) {
    var messages = []
    for (let j = 0; j < fields[i].rules.length; j++) {
        if (fields[i].rules[j] == 'lowercase') {
          if (validation.exists(fields[i].value)) {
            fields[i].value = fields[i].value.toLowerCase()
          }
        }

        if (fields[i].rules[j] == 'trim') {
          if (validation.exists(fields[i].value)) {
            fields[i].value = fields[i].value.trim()
          }
        }

        if (fields[i].rules[j] == 'required') {
          if (!validation.exists(fields[i].value)) {
            messages.push(fields[i].key + ' is required')
          }
        }

        if (fields[i].rules[j] == 'required_on') {
          if (validation.exists(fields[i].required_on)) {
            if (fields[i].required_on_value.includes(fields[i].required_on)) {
              if (!validation.exists(fields[i].value)) {
                messages.push(`${fields[i].key} is required when ${fields[i].required_on_key} is ${fields[i].required_on_value.toString()}`)
              }
            } else {
              fields[i].rules = []
            }
          }
        }

        if (fields[i].rules[j] == 'enum') {
          if (messages.length == 0) {
            if (fields[i].enum.indexOf(fields[i].value) == -1) {
              messages.push(`${fields[i].key} must have value one of [${fields[i].enum.toString()}]`)
            }
          }
        }

        if (validation.exists(fields[i].value) && fields[i].rules[j] == 'email') {
          if (!this.isEmail(fields[i].value)) {
            messages.push('Invalid email address')
          }
        }

        if (fields[i].rules[j] == 'equal_with') {
          if (fields[i].value != fields[i].value2) {
            messages.push(fields[i].key + ' and ' + fields[i].key2 + ' is not match')
          }
        }

        if (fields[i].rules[j] == 'not_zero') {
          if (fields[i].value == 0) {
            messages.push('Please fill ' + fields[i].key)
          }
        }

        if (fields[i].rules[j] == 'min_password') {
          if (fields[i].value.length < 8 && fields[i].value.length === undefined) {
            messages.push('Password minimum 8 characters')
          }
        }

        if (validation.exists(fields[i].value) && fields[i].rules[j] == 'email-exist') {
          let checkEmail = {
            email: fields[i].value
          }
          let findData = await fields[i].model.findUnique({ where: checkEmail })
          if (findData !== null) {
            messages.push(fields[i].value + ' was already exist')
          }
        }

        if (validation.exists(fields[i].value) && fields[i].rules[j] == 'date') {
          if (!validator.isISO8601(fields[i].value)) {
            messages.push('Invalid Date, Not YYYY-MM-DD format')
          }
        }

        if (validation.exists(fields[i].value) && fields[i].rules[j] == 'number') {
          if (!validator.isNumeric(String(fields[i].value))) {
            messages.push(`Invalid ${fields[i].key}, Not numeric format`)
          }
          fields[i].value = Number(fields[i].value)
        }

        if (validation.exists(fields[i].value) && fields[i].rules[j] == 'escape') {
          fields[i].value = validator.escape(fields[i].value)
        }

        if (validation.exists(fields[i].value) && fields[i].rules[j] == 'regex') {
          let pattern = new RegExp(fields[i].regex)
          if (!pattern.test(fields[i].value)) {
            messages.push(fields[i].regex_message)
          }
        }

        if (messages.length == 0 &&  fields[i].rules[j] == 'page') {
          if (fields[i].value < 1) {
            messages.push(`Field ${fields[i].key}, can't lower than 1`)
          }
        }
      }

      content[fields[i].key] = fields[i].value

      if (messages.length > 0) {
        error = true
        result[fields[i].key] = messages
      }
    }
    if (error) {
        throw result
    } else {
        return content
    }
  }

  static isEmail (mail) {
    let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
    return re.test(mail) ? true : false
  }

  static isDate (date) {
    return validation.isType(date, 'date')
  }
}

module.exports = Validator