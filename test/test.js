const { expect, assert } = require('chai')

import GreetUser from '../src/js/testClass'

var greet = new GreetUser('john','doe')
describe('initial checks', function(){
  it('should return string', function(){
    var userGreeted = greet.sayHello()
    expect(userGreeted).to.be.a('string')
  })
  it('should return number', function(){
    var userGreeted = greet.sum(10,20)
    expect(userGreeted).to.be.a('number')
  })
})
