const { assert } = require('chai')
import HttpRequest from '../src/js/httpRequest'

describe('http request tests', function () {
  it('should test rejections using then', () => {
    var httpXHR = new HttpRequest('GET', `${process.env.API_URL}categories`, '')
    return httpXHR.customAjax()
    .then(() => Promise.reject(new Error('Expected method to reject.')),
      err => assert.instanceOf(err, Error)
    )
  })
})
