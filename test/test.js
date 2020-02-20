import { expect } from 'chai'
import SayHi from '../src/js/testClass.js'



describe('sum function', () => {
  // it('sums up two integers', () => {
  //   expect(sum(1, 2)).to.eql(3)
  // })
  it('say hi', () => {
    const hello = new SayHi()
    expect(hello.greet).to.be.a('string')
  })
})
