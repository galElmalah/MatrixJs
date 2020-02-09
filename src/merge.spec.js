const merge = require('./merge');
const {Matrix} = require('./Matrix');
describe('mergeMatrix', () => {
  it('should merge the matrixes from the top', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,3)
    expect(merge(matOne,matTwo, ['top'])).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4]])
  })

  it('should merge the matrixes from the bottom', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,3)
    expect(merge(matOne,matTwo, ['bottom'])).toEqual([[0, 1, 2], [1, 2, 3], [2, 3, 4],[1, 1, 1], [1, 1, 1], [1, 1, 1]])
  })

  it('should merge the matrixes from the top and from the bottom', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,3)
    expect(merge(matOne,matTwo, ['bottom', 'top'])).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1],[0, 1, 2], [1, 2, 3], [2, 3, 4],[1, 1, 1], [1, 1, 1], [1, 1, 1]])
  })

  it('should throw an error when trying to merge from top or bottom and the number of columns doesn\'t match', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,4)
    expect(() =>merge(matOne,matTwo, ['bottom'])).toThrow(RangeError)
    expect(() =>merge(matOne,matTwo, ['top'])).toThrow(RangeError)
  })
})