var reporters = require('jasmine-reporters');

var junitReporter = new reporters.JUnitXmlReporter({
  savePath: './test-results',
  filePrefix: 'result',
  consolidateAll: true
});

jasmine.getEnv().addReporter(junitReporter);

const { add, subtract, multiply, divide } = require('../operators');
const interpretLisp = require('../interpreter.js');

describe('LISP interpreter', () => {
    describe('add function', () => {
        it('should return the sum of its arguments', () => {
            expect(add([1, 2, 3])).toEqual(6);
            expect(add([-1, -2, -3])).toEqual(-6);
            expect(add([1, 2, 3, 4, 5])).toEqual(15);
        });

        it('should throw an error if not given a list of numbers', () => {
            expect(() => add()).toThrowError(
                `Invalid input: + operator expects a list of numbers`
            );
            expect(() => add([1, '2', 3])).toThrowError(
                `Invalid input: + operator expects a list of numbers`
            );
            expect(() => add([1, [2, 3], 4])).toThrowError(
                `Invalid input: + operator expects a list of numbers`
            );
        });
    });

    describe('subtract function', () => {
        it('should return the difference between its arguments', () => {
            expect(subtract([10, 5])).toEqual(5);
            expect(subtract([-10, 5])).toEqual(-15);
            expect(subtract([10, -5])).toEqual(15);
        });

        it('should throw an error if not given exactly two numbers', () => {
            expect(() => subtract()).toThrowError(
                `Invalid input: - operator expects exactly two numbers`
            );
            expect(() => subtract([10])).toThrowError(
                `Invalid input: - operator expects exactly two numbers`
            );
            expect(() => subtract([10, 5, 1])).toThrowError(
                `Invalid input: - operator expects exactly two numbers`
            );
            expect(() => subtract([10, '5'])).toThrowError(`Invalid input: - operator expects exactly two numbers`);
        });
    });

    describe('multiply function', () => {
        it('should return the product of its arguments', () => {
            expect(multiply([1, 2, 3])).toEqual(6);
            expect(multiply([-1, -2, -3])).toEqual(-6);
            expect(multiply([1, 2, 3, 4, 5])).toEqual(120);
        });

        it('should throw an error if not given a list of numbers', () => {
            expect(() => multiply()).toThrowError(
                `Invalid input: * operator expects a list of numbers`
            );
            expect(() => multiply([1, '2', 3])).toThrowError(
                `Invalid input: * operator expects a list of numbers`
            );
            expect(() => multiply([1, [2, 3], 4])).toThrowError(
                `Invalid input: * operator expects a list of numbers`
            );
        });
    });

    describe('divide function', () => {
        it('should return the quotient of its arguments', () => {
            expect(divide([10, 5])).toEqual(2);
            expect(divide([-10, 5])).toEqual(-2);
            expect(divide([10, -5])).toEqual(-2);
        });

        it('should throw an error if not given exactly two numbers', () => {
            expect(() => divide()).toThrowError(
                `Invalid input: / operator expects exactly two numbers`
            );
            expect(() => divide([10])).toThrowError(
                `Invalid input: / operator expects exactly two numbers`
            );
            expect(() => divide([10, 5, 1])).toThrowError(
                `Invalid input: / operator expects exactly two numbers`
            );
            expect(() => divide([10, '5'])).toThrowError(
                `Invalid input: / operator expects exactly two numbers`
            );
        });
    });

    describe('interpretLisp function', () => {
        it('should correctly evaluate a given LISP expression', () => {
            expect(interpretLisp('(+ 1 2 3)')).toEqual(6);
            expect(interpretLisp('(- 10 5)')).toEqual(5);
            expect(interpretLisp('(* 2 3 4)')).toEqual(24);
            expect(interpretLisp('(/ 10 5)')).toEqual(2);
            expect(interpretLisp('(+ (* 2 3) (- 10 5))')).toEqual(11);
        });

        it('should throw an error if given an empty expression', () => {
            expect(() => interpretLisp('')).toThrowError(
                'Unable to evaluate empty expression'
            );
        });

        
        it('should throw an error if given an invalid expression', () => {
            expect(() => interpretLisp('(foo 1 2 3)')).toThrowError(
                'Unknown function: foo'
            );
        });

        // TODO: Fix failing tests.
        xit('should throw an error if given an invalid expression', () => {
            expect(() => interpretLisp('(+ 1 2 3')).toThrowError(
                'Missing closing parenthesis'
            );
            expect(() => interpretLisp('(+ 1 2 3) )')).toThrowError(
                'Unexpected closing parenthesis'
            );
        });
    });
});