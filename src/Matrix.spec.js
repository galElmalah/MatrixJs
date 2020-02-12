const {Matrix} = require('./Matrix')

describe('Matrix', () => {
  it('should build matrix correctly', () => {
    const rows = 3;
    const column = 4;
    const matrix = new Matrix(rows,column);
    expect(matrix.size).toEqual([rows,column])
    expect(matrix.matrix).toEqual([[1,1,1,1],[1,1,1,1],[1,1,1,1]])
  })

  it('should map the matrix correctly', () => {
    const rows = 2;
    const column = 2;
    const matrix = new Matrix(rows,column, {mapper: (i,j) => `${i},${j}`});
    expect(matrix.size).toEqual([rows,column])
    expect(matrix.matrix).toEqual([['0,0', '0,1'], ['1,0', '1,1']])
  })

  it('should return the correct column', () => {
    const matrix = new Matrix(2,2, {mapper: (i,j) => `${i},${j}`});
    expect(matrix.column(0)).toEqual(['0,0', '1,0'])
    expect(matrix.column(1)).toEqual(['0,1', '1,1'])

    expect(() =>matrix.column(-1)).toThrow(RangeError)
    expect(() =>matrix.column(2)).toThrow(RangeError)
  })

  it('should return the correct row', () => {
    const matrix = new Matrix(2,2, {mapper: (i,j) => `${i},${j}`});
    expect(matrix.row(0)).toEqual(['0,0', '0,1'])
    expect(matrix.row(1)).toEqual(['1,0', '1,1'])
    
    expect(() =>matrix.row(-1)).toThrow(RangeError)
    expect(() =>matrix.row(2)).toThrow(RangeError)
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
      expect(additionResult.matrix).toEqual([[2,2],[2,2]])
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
        expect(additionResult.matrix).toEqual([[0,0],[0,0]])
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

  describe('Reduce' , () => {
    it('should call the reduce function', () => {
      const mock = jest.fn();
      const originalMat = new Matrix(3,3);
      originalMat.reduce(mock, 0);
      expect(mock).toHaveBeenCalledTimes(9)
    })

    it('should reduce the matrix to a single value', () => {
      const originalMat = new Matrix(3,3);
      originalMat.reduce((a,b) => a+b, 0);
      expect(originalMat.reduce((a,b) => a+b, 0)).toBe(9)
    })

    it('should reduce the matrix to a single value and use the first element as the initial value if none is provided', () => {
      let mat = new Matrix(3,3);
      mat.reduce((a,b) => a+b);
      expect(mat.reduce((a,b) => a+b, 0)).toBe(9)

      mat = new Matrix(3,3, {mapper:(i,j)=> `(${i},${j})`});
      expect( mat.reduce((a,b) => a+ ", " +b)).toBe("(0,0), (0,1), (0,2), (1,0), (1,1), (1,2), (2,0), (2,1), (2,2)")
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

  describe('Multiply' , () => {
    it('should multiply each cell by a constant', () => {
      const mat = new Matrix(2,2);
      const by = 3
      const newMat = mat.multiply(by);
      expect(newMat.matrix).toEqual([[3,3],[3,3]]);
    })

    it('should multiply matrixes correctly', () => {
      const first = [[1,2,3],[4,5,6]]
      const second = [[7,8],[9,10],[11,12]]
      const mat = new Matrix(2,3, {mapper: (i,j) => first[i][j]});
      const by = new Matrix(3,2,{mapper: (i,j) => second[i][j]});
      const result = mat.multiply(by);
      expect(result.size).toEqual([2,2])
      expect(result.matrix).toEqual([[58,64],[139,154]]);
    })

    it('should multiply with a vector correctly', () => {
      const first = [[3,4,2]]
      const second = [[13,9,7,15],[8,7,4,6], [6,4,0,3]]
      const mat = new Matrix(1,3, {mapper: (i,j) => first[i][j]});
      const by = new Matrix(3,4, {mapper: (i,j) => second[i][j]});
      const result = mat.multiply(by);
      expect(result.size).toEqual([1,4])
      expect(result.matrix).toEqual([[83,63,37,75]]);
    })

    it('should throw RangeError when multiplying matrixes with wrong sizes', () => {
      let mat = new Matrix(2,3);
      let by = new Matrix(4,3);
      expect(() => mat.multiply(by)).toThrow(RangeError)
      mat = new Matrix(3,3);
      by = new Matrix(4,2)
      expect(() => mat.multiply(by)).toThrow(RangeError)
    })
  })

  describe('SubMatrix' , () => {
    it('should throw error for invalid boundaries', () => {
      const mat = new Matrix(2,3);
      expect(() => mat.subMatrix([0,2], [0,2])).toThrow(RangeError)
      expect(() => mat.subMatrix([0,1], [0,-2])).toThrow(RangeError)
      expect(() => mat.subMatrix([0,1], [0,3])).toThrow(RangeError)
    })

    it('should create a sub matrix from the boundaries provided', () => {
      const mat = new Matrix(3,3, {mapper: (i,j) => `(${i},${j})`});
      const subMatrix = mat.subMatrix([0,2],[0,2]);
      expect(subMatrix.matrix).toEqual([["(0,0)","(0,1)"],["(1,0)","(1,1)"]])
    })

    it('should create a sub matrix from the boundaries provided - complex', () => {
      const mat = new Matrix(10,10, {mapper: (i,j) => `(${i},${j})`});
      Object.freeze(mat.matrix)
      const subMatrix = mat.subMatrix([2,5],[2,5]);
      expect(subMatrix).not.toBe(mat)
      expect(subMatrix.matrix).toEqual([["(2,2)", "(2,3)", "(2,4)" ],["(3,2)", "(3,3)", "(3,4)"], ["(4,2)", "(4,3)", "(4,4)"]])
    })
  })

  describe('Merge', () => {
    it('should merge two matrices', () => {
      const mat = new Matrix(3,3);
      const matToMerge = new Matrix(3,3);
      expect(mat.merge(matToMerge, ['top']).rowsSize).toBe(6);
      expect(mat.merge(matToMerge, ['top','bottom']).rowsSize).toBe(9);
      expect(mat.merge(matToMerge, ['top']).columnsSize).toBe(3);
      expect(mat.merge(matToMerge, ['top','bottom']).columnsSize).toBe(3);

      expect(mat.merge(matToMerge, ['left']).columnsSize).toBe(6);
      expect(mat.merge(matToMerge, ['left','right']).columnsSize).toBe(9);
      expect(mat.merge(matToMerge, ['left']).rowsSize).toBe(3);
      expect(mat.merge(matToMerge, ['left', 'right']).rowsSize).toBe(3);
    })
  })

})