import {
    setupDevKernel, TestContext,
    TestKernel, XUtil,
} from '@grandlinex/core';
import { ELogger } from '../src';

const appName = 'TestKernel';
const appCode = 'tkernel';

const [testPath] =XUtil.setupEnvironment([__dirname,'..'],['data','config'])

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
