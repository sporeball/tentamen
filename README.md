# tentamen

<a href="https://www.npmjs.com/package/tentamen"><img src="https://img.shields.io/npm/v/tentamen" /></a>

**tentamen** is a tiny (less than 50 source lines of code) JavaScript testing framework.\
it uses deep equality, so you can test against arrays and objects with ease.

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
  o absolutely
  o acknowledge
falsy cases
  o tentamen
  o percentage

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

a function to manipulate the input to each test before the test runs.

##### after(output)
type: `function`

a function to manipulate the output of each test before tentamen verifies it.

##### error(e)
type: `function`

if an error thrown during testing is not of the default `Error` type, this function will decide what is output below the name of the failing test:
```js
let tentamen = new Tentamen({
  fn: () => { throw new Exception('something went wrong'); },
  error: e => e.message
});

class Exception {
  constructor (message) {
    this.message = `error: ${message}\n  at line:column`
  }
}

tentamen.suite('custom errors');
tentamen.add('should do something');
```
```
$ node test.js
custom errors
  x should do something
    error: something went wrong
      at line:column
```

the return value of this function must be of type `string`.\
if an error *is* of type `Error`, `e.stack` will be output.

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

the input to the test. this value will be manipulated by `this.before` first.

#### expected
type: `any`

the expected output of the test, after it has been manipulated by `this.after`.

### tentamen.done()
finish testing, and output the number of passing tests.

### donate
you can support the development of this project and others via Patreon:

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dsporeball%26type%3Dpledges%26suffix%3D%252Fmonth&style=for-the-badge)](https://patreon.com/sporeball)
