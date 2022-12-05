# tentamen

<a href="https://www.npmjs.com/package/tentamen"><img src="https://img.shields.io/npm/v/tentamen" /></a>

**tentamen** is a tiny (less than 50 source lines of code) JavaScript testing framework, just perfect for making sure that a function gives the right return values.
it uses deep equality, so you can easily test against things like arrays, objects, [and even error instances.](#on-tests-and-errors)


### install
```
npm i --save tentamen
```

### usage
```js
import Tentamen from 'tentamen';
let tentamen = new Tentamen({
  fn: str => str.startsWith('a')
});

tentamen.suite('truthy cases');
tentamen.add('absolutely', 'absolutely', true);
tentamen.add('acknowledge', 'acknowledge', true);

tentamen.suite('falsy cases');
tentamen.add('tentamen', 'tentamen', false);
tentamen.add('percentage', 'percentage', false);

tentamen.done();
```
```
$ node test.js
truthy cases
  o  absolutely
  o  acknowledge
falsy cases
  o  tentamen
  o  percentage

4 of 4 tests passing
```

## API

### new Tentamen(obj)

#### obj
type: `object`

##### fn
type: `function`

the function to run tests on.

##### before(input)
type: `function`

function to call before each test. good for pre-conditions.

##### after(output)
type: `function`

function to call after each test. good for cleanup.

### tentamen.suite(title, fn?)
start a new group of tests.

#### title
type: `string`

the suite title.

#### fn
type: `function`

a new function to replace the current value of `this.fn` with.

### tentamen.add(title, input, expected)
run a new test.

#### title
type: `string`

the test title.

#### input
type: `any`

the input to test with.

#### expected
type: `any`

the expected output of the test.

### tentamen.done()
finish testing, and output the number of passing tests.

## more information

### on tests and errors
normally, if the function being tested throws an error, tentamen will simply fail the test and show it to you &mdash; but what if you want to test *for* an error, to make sure that your code is throwing the right thing at the right time?

in that case, you can add a test whose `expected` value is an error instance:
```js
tentamen.suite('error');
// arrays don't have a startsWith method!
tentamen.add('should fail, [], new TypeError);
```
```
error
  o  should fail
     (TypeError)
```

this works with custom error classes, too.

### license
MIT
