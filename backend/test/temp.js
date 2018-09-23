import test from 'ava';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import * as _ from 'lodash';
import { v4 } from 'uuid';
import * as path from 'path';

import { addTime, insertTime } from '../lib/util/taskList';

test.after(t => {
});

test('insertTime inserts times in correct place in array', t => {
  const origTimes = [1,4,3];
  const res = insertTime(origTimes, 2);
  t.deepEqual(res, [1,2,3,4]);
  t.pass();
});

test('insertTime handles strings', t => {
  const origTimes = ['1', '4', '3'];
  const res = insertTime(origTimes, '2');
  t.deepEqual(res, ['1', '2', '3', '4']);
  t.pass();
});

test('addTime modifies a file to add time', t => {
  const origFile = [1,4,3];
  const testFileThatExists = 'testFixtures/testTaskList';
  writeFileSync(testFileThatExists, _.join(origFile, '\n'));
  addTime(testFileThatExists, 2);
  const fromFile = _.split(readFileSync(testFileThatExists, 'utf8'), '\n');
  t.deepEqual(fromFile, ['1', '2', '3', '4']);
  t.pass();
});

test('addTime works even if the files does not exist', t => {
  const testFileThatDoesNotExist = `testFixtures/${v4()}`;
  addTime(testFileThatDoesNotExist, 2);
  const fromFile = _.split(readFileSync(testFileThatDoesNotExist, 'utf8'), '\n');
  t.deepEqual(fromFile, ['2']);
  t.pass();
});
