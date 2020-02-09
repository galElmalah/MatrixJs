const addRows = addRowsTo => (matrix, onTop) => {
  for(let row of matrix) {
    onTop ? addRowsTo.unshift(row) : addRowsTo.push(row)
  }
}

const assertEqualColumns = (firstMat, secondMat) => {
  if(firstMat.columnsSize !== secondMat.columnsSize) {
    throw new RangeError('cannot merge from top or bottom matrices that don\'t have the same number of columns.')
  }
}

function mergeMatrix(firstMat, secondMat, directions) {
  const mat = [];
  const rowAdder = addRows(mat)
  let isMatBeenAddedTo = false

  const top = () => {
    assertEqualColumns(firstMat, secondMat)
    if(!isMatBeenAddedTo ) {
      rowAdder(secondMat);
      rowAdder(firstMat);
      isMatBeenAddedTo = true;
      return;
    }
    rowAdder(secondMat, true);
  }

  const bottom = () => {
    assertEqualColumns(firstMat, secondMat)
    if(!isMatBeenAddedTo) {
      rowAdder(firstMat);
      rowAdder(secondMat);
      isMatBeenAddedTo = true;
      return;
    }
    rowAdder(secondMat);
  }

  const mergers = {
    top,
    bottom
  }

  directions.forEach(mergeDirection => {
    mergers[mergeDirection]()
  });
  
  return mat
}

module.exports = mergeMatrix
