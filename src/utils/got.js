const got = require('got')
const { UA, referer } = require('../config')

const options = {
  resolveBodyOnly: true,
  responseType: 'json',
  headers: {
    referer,
    'user-agent': UA
  }
}
module.exports = got.extend({
  ...options
})
