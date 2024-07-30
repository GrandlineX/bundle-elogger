import {JestLib, setupDevKernel, TestContext, TestKernel, XUtil,} from '@grandlinex/core';
import {ELogger} from '../index.js';

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

JestLib.jestStart();
JestLib.jestCore();
JestLib.jestDb();
JestLib.jestEnd();
JestLib.jestOrm();
