const {mergeMatrices} = require('./mergeMatrices');
const {Matrix} = require('./Matrix');
describe('mergeMatrices', () => {
  it('should merge the matrixes from the top', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,3)
    expect(mergeMatrices(matOne,matTwo, ['top'])).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1], [0, 1, 2], [1, 2, 3], [2, 3, 4]])
  })

  it('should merge the matrixes from the bottom', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,3)
    expect(mergeMatrices(matOne,matTwo, ['bottom'])).toEqual([[0, 1, 2], [1, 2, 3], [2, 3, 4],[1, 1, 1], [1, 1, 1], [1, 1, 1]])
  })

  it('should merge the matrixes from the top and from the bottom', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,3)
    expect(mergeMatrices(matOne,matTwo, ['bottom', 'top'])).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1],[0, 1, 2], [1, 2, 3], [2, 3, 4],[1, 1, 1], [1, 1, 1], [1, 1, 1]])
    expect(mergeMatrices(matOne,matTwo, ['top', 'bottom'])).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1],[0, 1, 2], [1, 2, 3], [2, 3, 4],[1, 1, 1], [1, 1, 1], [1, 1, 1]])

  })

  it('should throw an error when trying to merge from top or bottom and the number of columns doesn\'t match', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,4)
    expect(() =>mergeMatrices(matOne,matTwo, ['bottom'])).toThrow(RangeError)
    expect(() =>mergeMatrices(matOne,matTwo, ['top'])).toThrow(RangeError)
  })

  it('should merge the matrices from the right', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j})
    const matTwo = new Matrix(3,3)
    expect(mergeMatrices(matOne,matTwo, ['right'])).toEqual([ [ 0, 1, 2, 1, 1, 1 ],[ 1, 2, 3, 1, 1, 1 ],[ 2, 3, 4, 1, 1, 1 ] ]);
  })

  it('should merge the matrices from the left', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j});
    const matTwo = new Matrix(3,3);
    expect(mergeMatrices(matOne,matTwo, ['left'])).toEqual([ [ 1, 1, 1, 0, 1, 2 ],[ 1, 1, 1, 1, 2, 3 ],[ 1, 1, 1, 2, 3, 4 ] ]);
  })

  it('should merge the matrices from left and right', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j});
    const matTwo = new Matrix(3,3);
    expect(mergeMatrices(matOne,matTwo, ['left', 'right'])).toEqual([ [ 1, 1, 1, 0, 1, 2,1, 1, 1 ],[ 1, 1, 1, 1, 2, 3,1, 1, 1 ],[ 1, 1, 1, 2, 3, 4,1, 1, 1 ] ]);
    expect(mergeMatrices(matOne,matTwo, ['right', 'left'])).toEqual([ [ 1, 1, 1, 0, 1, 2,1, 1, 1 ],[ 1, 1, 1, 1, 2, 3,1, 1, 1 ],[ 1, 1, 1, 2, 3, 4,1, 1, 1 ] ]);
  })

  it('should throw an error when trying to merge from the sides matrices with different row sizes', () => {
    const matOne = new Matrix(4,3, {mapper:(i,j) => i+j});
    const matTwo = new Matrix(3,3);
    expect(() => mergeMatrices(matOne,matTwo, ['left', 'right'])).toThrow(RangeError)
    expect(() => mergeMatrices(matOne,matTwo, ['right', 'left'])).toThrow(RangeError)
    expect(() => mergeMatrices(matOne,matTwo, ['left'])).toThrow(RangeError)
    expect(() => mergeMatrices(matOne,matTwo, ['right'])).toThrow(RangeError)
  })

  it('should not allow illegal merge directions', () => {
    const matOne = new Matrix(3,3, {mapper:(i,j) => i+j});
    const matTwo = new Matrix(3,3);
    expect(() => mergeMatrices(matOne,matTwo, ['left', 'top'])).toThrow(Error);
    expect(() => mergeMatrices(matOne,matTwo, ['top', 'top', 'left'])).toThrow(Error);
    expect(() => mergeMatrices(matOne,matTwo, ['top', 'bottom', 'right'])).toThrow(Error);
  })

})