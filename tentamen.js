/*
  tentamen.js
  tentamen core
  copyright (c) 2021 sporeball
  MIT license
*/

const logUpdate = require('log-update');

class Tentamen {
  constructor(obj) {
    this.fn = obj.fn;
    this.before = obj.before || function(input) {
      return input;
    }
    this.after = obj.after || function(input) {
      return input;
    }
  }

  add(title, input, expected) {
    logUpdate(`    ${title}`);

    input = (this.before)(input);
    let output = (this.fn)(input);
    output = (this.after)(output);
    if (output === expected) {
      logUpdate(`  O ${title}`);
    } else {
      logUpdate(`  X ${title}`);
    }

    logUpdate.done();
  }

  suite(title, fn = this.fn) {
    this.fn = fn;
    console.log(title);
  }
}

module.exports = Tentamen;
