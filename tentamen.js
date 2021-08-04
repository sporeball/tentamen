/*
  tentamen.js
  copyright (c) 2021 sporeball
  MIT license
*/

import chalk from 'chalk';
import { dequal } from 'dequal/lite';
import logUpdate from 'log-update';
import indentString from 'indent-string';

export default class Tentamen {
  constructor (obj) {
    this.passing = this.failing = 0;
    this.fn = obj.fn;
    this.before = obj.before || function (input) { return input; };
    this.after = obj.after || function (input) { return input; };
    this.error = obj.error || function (e) { return e; };
  }

  add (title, input, expected) {
    logUpdate(`    ${title}`);
    input = this.before(input);
    let output;

    try {
      output = this.after(this.fn(input));
    } catch (e) {
      this.failing++;
      logUpdate(`  ${chalk.red('x')} ${title}`);
      if (e instanceof Error) {
        console.log(indentString(e.stack, 4));
      } else {
        console.log(indentString(this.error(e), 4));
      }
      return;
    }

    if (dequal(output, expected)) {
      this.passing++;
      logUpdate(`  ${chalk.green('o')} ${title}`);
    } else {
      this.failing++;
      logUpdate(`  ${chalk.red('x')} ${title}`);
      console.log(`    expected ${expected}, got ${output}`);
    }
    logUpdate.done();
  }

  suite (title, fn = this.fn) {
    this.fn = fn;
    console.log(chalk.cyan(title));
  }

  done () {
    console.log(`\n${this.passing} of ${this.passing + this.failing} tests passing`);
  }
}
