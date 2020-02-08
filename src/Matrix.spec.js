const {Matrix} = require('./Matrix')

describe('Matrix', () => {
  it('should build matrix correctly', () => {
    const rows = 3;
    const column = 4;
    const matrix = new Matrix(rows,column);
    expect(matrix.size).toEqual([rows,column])
    expect(matrix.build()).toEqual([[1,1,1,1],[1,1,1,1],[1,1,1,1]])
  })

  it('should map the matrix correctly', () => {
    const rows = 2;
    const column = 2;
    const matrix = new Matrix(rows,column, {mapper: (i,j) => `${i},${j}`});
    expect(matrix.size).toEqual([rows,column])
    expect(matrix.build()).toEqual([['0,0', '0,1'], ['1,0', '1,1']])
  })
})

describe('Matrix operations', () => {

  describe('Addition', () => {
    it('should throw if matrixes are of different sizes when adding', () => {
      const rows = 3;
      const column = 4;
      const matrixOne = new Matrix(rows +1,column);
      const matrixTwo = new Matrix(rows,column);
      expect(() => matrixOne.plus(matrixTwo)).toThrow(Error);
    })
  
    it('should add matrixes', () => {
      const rows = 2;
      const column = 2;
      const matrixOne = new Matrix(rows,column);
      const matrixTwo = new Matrix(rows,column);
      const additionResult = matrixOne.plus(matrixTwo);
      expect(additionResult).not.toBe(matrixTwo);
      expect(additionResult).not.toBe(matrixOne);
      expect(additionResult.build()).toEqual([[2,2],[2,2]])
    })
  
  })

  describe('Subtractions' , () => {
    it('should throw if matrixes are of different sizes when adding', () => {
      const rows = 3;
      const column = 4;
      const matrixOne = new Matrix(rows +1,column);
      const matrixTwo = new Matrix(rows,column);
      expect(() => matrixOne.minus(matrixTwo)).toThrow(Error);
    })

    it('should subtract matrixes', () => {
        const rows = 2;
        const column = 2;
        const matrixOne = new Matrix(rows,column);
        const matrixTwo = new Matrix(rows,column);
        const additionResult = matrixOne.minus(matrixTwo);
        expect(additionResult).not.toBe(matrixTwo);
        expect(additionResult).not.toBe(matrixOne);
        expect(additionResult.build()).toEqual([[0,0],[0,0]])
    })
  })

  describe('Map' , () => {
    it('should call the mapper function with the cell value, indexes and the matrix itself', () => {
      const mock = jest.fn();
      const originalMat = new Matrix(2,2);
      const mat = originalMat.map(mock);
      expect(mat).not.toBe(originalMat)
      mat.build()
      expect(mock).toHaveBeenCalledTimes(4)
      expect(mock).toHaveBeenLastCalledWith(originalMat.cell(1,1),[1,1],expect.anything())
    })

    it('apply the mapping correctly', () => {
      const fn = (value, [i,j]) => value + i + j;
      const originalMat = new Matrix(2,2);
      const mat = originalMat.map(fn);
      expect(mat).not.toBe(originalMat)
      expect(mat.build()).toEqual([[1, 2], [2, 3]])
    })
  })

  describe('ForEach' , () => {
    it('should iterate over all the matrix and call the function supplied', () => {
      const mock = jest.fn();
      const originalMat = new Matrix(3,3);
      originalMat.forEach(mock);
      expect(mock).toHaveBeenCalledTimes(9)
      expect(mock).toHaveBeenLastCalledWith(originalMat.cell(2,2),[2,2],expect.anything())
    })
  })

  describe('Iterator' , () => {
    it('should have the ability to act as an iterator and return each row', () => {
      const mat = new Matrix(6,3);
      let counter = 0;
      for(let row of mat) {
        counter++
        expect(row).toEqual([1,1,1])
        expect(row).toBeInstanceOf(Array)
      }
      expect(counter).toBe(6)
    })
  })

  describe('Transpose' , () => {
    it('should transpose the matrix correctly', () => {
      const mat = new Matrix(2,3, {mapper:(i,j) => i+j});
      const transposed = mat.transpose();
      expect(transposed).not.toBe(mat)
      expect(transposed.build()).toEqual([[0,1],[1,2],[2,3]])
    })
  })

})