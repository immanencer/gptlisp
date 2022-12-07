// interpreter.js
const { add, subtract, multiply, divide } = require('./operators');

const interpretLisp = (expression) => {
  if (!expression) {
    throw new Error('Unable to evaluate empty expression');
  }
  const tokens = tokenize(expression);
  return evaluate(tokens);
};

const tokenize = (expression) => {
  return expression.replace(/[()]/g, ' $& ').trim().split(/\s+/);
};

const evaluate = (tokens) => {
  if (tokens.length === 0) {
    throw new Error('Unable to evaluate empty expression');
  }

  const token = tokens.shift();

  if (token === '(') {
    const callee = tokens.shift();
    const args = [];

    while (tokens[0] !== ')') {
      args.push(evaluate(tokens));
    }

    if (tokens.length === 0) {
      throw new Error('Missing closing parenthesis');
    }

    tokens.shift();  // remove closing parenthesis

    const operators = {
      '+': add,
      '-': subtract,
      '*': multiply,
      '/': divide,
    };

    if (operators[callee]) {
      return operators[callee](args);
    } else {
      throw new Error(`Unknown function: ${callee}`);
    }
  } else if (token === ')') {
    throw new Error('Unexpected closing parenthesis');
  } else {
    return parseInt(token);
  }
};

module.exports = interpretLisp;