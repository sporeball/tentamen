/*
  tentamen.js
  copyright (c) 2021 sporeball
  MIT license
*/

import chalk from 'chalk';
import logUpdate from 'log-update';

export default class Tentamen {
  constructor (obj) {
    this.passing = this.failing = 0;
    this.fn = obj.fn;
    this.before = obj.before || function (input) { return input; };
    this.after = obj.after || function (input) { return input; };
  }

  add (title, input, expected) {
    logUpdate(`    ${title}`);
    input = this.before(input);
    const output = this.after(this.fn(input));
    if (output === expected) {
      this.passing++;
      logUpdate(`  ${chalk.green('o')} ${title}`);
      logUpdate.done();
    } else {
      this.failing++;
      logUpdate(`  ${chalk.red('x')} ${title}`);
      logUpdate.done();
      console.log(`    expected ${expected}, got ${output}`);
    }
  }

  suite (title, fn = this.fn) {
    this.fn = fn;
    console.log(title);
  }

  done () {
    console.log(`\n${this.passing} of ${this.passing + this.failing} tests passing`);
  }
}
