import * as Path from 'path';
import {
  createFolderIfNotExist,
  setupDevKernel, TestContext,
  TestKernel,
} from '@grandlinex/core';
import { ELogger } from '../src';

const appName = 'TestKernel';
const appCode = 'tkernel';
const msiPath = Path.join(__dirname, '..', 'data');
const testPath = Path.join(__dirname, '..', 'data', 'config');

createFolderIfNotExist(msiPath);
createFolderIfNotExist(testPath);
const [kernel] = TestContext.getEntity(
    {
      kernel:new TestKernel(appName, appCode, testPath, __dirname, (k) => new ELogger(k)),
      cleanUpPath: testPath
    }
);

setupDevKernel(kernel);

require('@grandlinex/core/dist/dev/lib/start');
require('@grandlinex/core/dist/dev/lib/core');
require('@grandlinex/core/dist/dev/lib/dbcon');
require('@grandlinex/core/dist/dev/lib/end');
require('@grandlinex/core/dist/dev/lib/orm');
