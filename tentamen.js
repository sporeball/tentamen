/*
  tentamen.js
  copyright (c) 2021 sporeball
  MIT license
*/

import chalk from 'chalk';
import { dequal } from 'dequal/lite';
import indentString from 'indent-string';

export default class Tentamen {
  constructor (obj) {
    this.passing = this.failing = 0;
    this.fn = obj.fn;
    this.before = obj.before || function (input) { return input; };
    this.after = obj.after || function (input) { return input; };
    this.error = obj.error || function (e) { return e; };
    this.afterError = obj.afterError || function (e) { return e; };
  }

  add (title, input, expected) {
    input = this.before(input);
    let output;

    try {
      output = this.after(this.fn(input));
    } catch (e) {
      output = this.error(e);
      if (dequal(this.afterError(output), expected)) {
        this.passing++;
        console.log(`  ${chalk.green('o')} ${title}`);
      } else {
        this.failing++;
        console.log(`  ${chalk.red('x')} ${title}`);
        console.log(indentString(output, 4));
      }
      return;
    }

    if (dequal(output, expected)) {
      this.passing++;
      console.log(`  ${chalk.green('o')} ${title}`);
    } else {
      this.failing++;
      console.log(`  ${chalk.red('x')} ${title}`);
      console.log(`    expected ${expected}, got ${output}`);
    }
  }

  suite (title, fn = this.fn) {
    this.fn = fn;
    console.log(chalk.cyan(title));
  }

  done () {
    console.log(`\n${this.passing} of ${this.passing + this.failing} tests passing`);
  }
}
