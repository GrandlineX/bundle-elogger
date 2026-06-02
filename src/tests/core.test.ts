import {JestLib, setupDevKernel, TestContext, TestKernel, XUtil,} from '@grandlinex/core';
import {ELogger} from '../index.js';

const appName = 'TestKernel';
const appCode = 'tkernel';


const [kernel] = TestContext.getEntity(
    {
      kernel:new TestKernel(appName, appCode, __dirname, (k) => new ELogger(k)),
      cleanUp:true
    }
);

setupDevKernel(kernel);

JestLib.jestStart();
JestLib.jestCore();
JestLib.jestDb();
JestLib.jestEnd();
JestLib.jestOrm();
