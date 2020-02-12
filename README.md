# easy-matrix
An easy to use Matrix library

## Getting started

```npm
npm i -s easy-matrix
```

### Basic example
Lets look at a common use case of adding two matrices
```javascript
const { Matrix } = require('easy-matrix');

const mat1 = new Matrix(5,5, {mapper: (i,j) => i+j});
const mat2 = new Matrix(5,5, {mapper: (i,j) => i});

/* 
the output will be a new Matrix instance which contains 
the result of the matrices addition 
*/
const additionResult = mat1.plus(mat2);

```