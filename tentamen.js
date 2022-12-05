/*
  tentamen.js
  copyright (c) 2021 sporeball
  MIT license
*/

import colors from 'picocolors';
import { dequal } from 'dequal/lite';

export default class Tentamen {
  constructor (obj) {
    this.passing = this.failing = 0;
    this.fn = obj.fn;
    this.before = obj.before || function () { };
    this.after = obj.after || function () { };
  }

  add (title, input, expected) {
    this.before();

    let returned, errored;

    try {
      returned = this.fn(input);
    } catch (e) {
      returned = e;
      errored = true;
    }

    if (dequal(expected, returned)) {
      this.passing++;
      console.log(colors.green('  o  ') + title);
      if (errored) {
        console.log(colors.gray(`     (${returned.name})`));
      }
    } else {
      this.failing++;
      console.log(colors.red(`  X  ${title}`));
      if (errored) {
        console.log(returned);
      } else {
        console.log(colors.yellow(`     (expected ${expected}, got ${returned})`));
      }
    }

    this.after();
  }

  suite (title, fn = this.fn) {
    this.fn = fn;
    console.log(colors.cyan(title));
  }

  done () {
    console.log(`\n${this.passing} of ${this.passing + this.failing} tests passing`);
  }
}
