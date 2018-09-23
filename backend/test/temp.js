import test from 'ava';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import * as path from 'path';

import { addTime, insertTime, removeAlreadyRunTasks } from '../lib/util/taskList';

test.after(t => {
  // TODO (nw): avoid making infinite files on your hard drive by nuking the testFixtures directory between uses
});

test('insertTime inserts times in correct place in array', t => {
  const origTimes = [
    { time: 1, reminderId: 1, taskId: uuid.v4() },
    { time: 4, reminderId: 2, taskId: uuid.v4() },
    { time: 3, reminderId: 3, taskId: uuid.v4() },
  ];
  const res = _.map(insertTime(origTimes, 2, 4), time => _.pick(time, ['time', 'reminderId']));
  t.deepEqual(res, [
    { time: 1, reminderId: 1 },
    { time: 2, reminderId: 4 },
    { time: 3, reminderId: 3 },
    { time: 4, reminderId: 2 },
  ]);
  t.pass();
});

test('insertTime handles strings', t => {
  const origTimes = [
    { time: '1', reminderId: 1, taskId: uuid.v4() },
    { time: '4', reminderId: 2, taskId: uuid.v4() },
    { time: '3', reminderId: 3, taskId: uuid.v4() },
  ];
  const res = _.map(insertTime(origTimes, '2', 4), time => _.pick(time, ['time', 'reminderId']));
  t.deepEqual(res, [
    { time: '1', reminderId: 1 },
    { time: '2', reminderId: 4 },
    { time: '3', reminderId: 3 },
    { time: '4', reminderId: 2 },
  ]);
  t.pass();
});

test('addTime modifies a file to add time', t => {
  const origTimes = [
    { time: 1, reminderId: 1 },
    { time: 4, reminderId: 2 },
    { time: 3, reminderId: 3 },
  ];
  const testFileThatExists = 'testFixtures/testTaskList';
  writeFileSync(testFileThatExists, JSON.stringify(origTimes));
  addTime(testFileThatExists, 2, 4);
  const fromFile = _.map(JSON.parse(readFileSync(testFileThatExists, 'utf8')), time => _.pick(time, ['time', 'reminderId']));
  t.deepEqual(fromFile, [
    { time: 1, reminderId: 1 },
    { time: 2, reminderId: 4 },
    { time: 3, reminderId: 3 },
    { time: 4, reminderId: 2 },
  ]);
  t.pass();
});

test('addTime works even if the files does not exist', t => {
  const testFileThatDoesNotExist = `testFixtures/${uuid.v4()}`;
  addTime(testFileThatDoesNotExist, 2, 1);
  const fromFile = _.map(JSON.parse(readFileSync(testFileThatDoesNotExist, 'utf8')), time => _.pick(time, ['time', 'reminderId']));
  t.deepEqual(fromFile, [{ time: 2, reminderId: 1 }]);
  t.pass();
});

test('removeAlreadyRunTasks removes tasks from a task list', t => {
  const origTimes = [
    { time: 1, reminderId: 1, taskId: 1 },
    { time: 4, reminderId: 2, taskId: 2 },
    { time: 3, reminderId: 3, taskId: 3 },
  ];
  const res = removeAlreadyRunTasks(origTimes, [1]);
  t.deepEqual(res, [
    { time: 4, reminderId: 2, taskId: 2 },
    { time: 3, reminderId: 3, taskId: 3 },
  ]);
  t.pass();
});
