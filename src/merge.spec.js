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
    expect(merge(matOne,matTwo, ['top', 'bottom'])).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1],[0, 1, 2], [1, 2, 3], [2, 3, 4],[1, 1, 1], [1, 1, 1], [1, 1, 1]])

  })

  it('should throw an error when trying to merge from top or bottom and the number of columns doesn\'t match', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,4)
    expect(() =>merge(matOne,matTwo, ['bottom'])).toThrow(RangeError)
    expect(() =>merge(matOne,matTwo, ['top'])).toThrow(RangeError)
  })

  it('should merge the matrices from the right', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,3)
    expect(merge(matOne,matTwo, ['right'])).toEqual([ [ 0, 1, 2, 1, 1, 1 ],[ 1, 2, 3, 1, 1, 1 ],[ 2, 3, 4, 1, 1, 1 ] ]);
  })

  it('should merge the matrices from the left', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j});
    const matTwo = new Matrix(3,3);
    expect(merge(matOne,matTwo, ['left'])).toEqual([ [ 1, 1, 1, 0, 1, 2 ],[ 1, 1, 1, 1, 2, 3 ],[ 1, 1, 1, 2, 3, 4 ] ]);
  })

  it('should merge the matrices from left and right', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j});
    const matTwo = new Matrix(3,3);
    expect(merge(matOne,matTwo, ['left', 'right'])).toEqual([ [ 1, 1, 1, 0, 1, 2,1, 1, 1 ],[ 1, 1, 1, 1, 2, 3,1, 1, 1 ],[ 1, 1, 1, 2, 3, 4,1, 1, 1 ] ]);
    expect(merge(matOne,matTwo, ['right', 'left'])).toEqual([ [ 1, 1, 1, 0, 1, 2,1, 1, 1 ],[ 1, 1, 1, 1, 2, 3,1, 1, 1 ],[ 1, 1, 1, 2, 3, 4,1, 1, 1 ] ]);
  })

  it('should throw an error when trying to merge from the sides matrices with different row sizes', () => {
    const matOne = new Matrix(4,3, {mapper:(i,j) => i+j});
    const matTwo = new Matrix(3,3);
    expect(() => merge(matOne,matTwo, ['left', 'right'])).toThrow(RangeError)
    expect(() => merge(matOne,matTwo, ['right', 'left'])).toThrow(RangeError)
    expect(() => merge(matOne,matTwo, ['left'])).toThrow(RangeError)
    expect(() => merge(matOne,matTwo, ['right'])).toThrow(RangeError)
  })

})