// operators.js
const add = (args) => {
    if (!Array.isArray(args)) {
      throw new Error(`Invalid input: + operator expects a list of numbers`);
    }
  
    // Return the sum of the arguments if they are all numbers
    return args.reduce((acc, curr) => {
      if (typeof curr !== 'number') {
        throw new Error(`Invalid input: + operator expects a list of numbers`);
      }
      return acc + curr;
    }, 0);
  };

  const multiply = (args) => {
    if (!Array.isArray(args)) {
      throw new Error(`Invalid input: * operator expects a list of numbers`);
    }
  
    // Return the product of the arguments if they are all numbers
    return args.reduce((acc, curr) => {
      if (typeof curr !== 'number') {
        throw new Error(`Invalid input: * operator expects a list of numbers`);
      }
      return acc * curr;
    }, 1);
  };
  
  const divide = (args) => {
    if (!Array.isArray(args) || args.length !== 2) {
      throw new Error(`Invalid input: / operator expects exactly two numbers`);
    }
  
    // Return the quotient of the arguments if they are both numbers
    const [a, b] = args;
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error(`Invalid input: / operator expects exactly two numbers`);
    }
    return a / b;
  };
  
  const subtract = (args) => {
    if (!Array.isArray(args) || args.length !== 2) {
      throw new Error(`Invalid input: - operator expects exactly two numbers`);
    }
  
    // Return the difference of the arguments if they are both numbers
    const [a, b] = args;
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error(`Invalid input: - operator expects exactly two numbers`);
    }
    return a - b;
  };

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};