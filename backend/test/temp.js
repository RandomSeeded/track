import test from 'ava';
import { readFileSync, writeFileSync } from 'fs';
import * as _ from 'lodash';

import { addTime, insertTime } from '../lib/util/taskList';

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
  const testFileName = 'testTaskList';
  writeFileSync(testFileName, _.join(origFile, '\n'));
  addTime(testFileName, 2);
  const fromFile = _.split(readFileSync(testFileName, 'utf8'), '\n');
  t.deepEqual(fromFile, ['1', '2', '3', '4']);
  t.pass();
});
