import {
    TestLib,
    setupDevKernel,
    TestContext,
    TestKernel,
} from '@grandlinex/core/dev';
import { ELogger } from "../src";

const appName = 'TestKernel';
const appCode = 'tkernel';


const [kernel] = TestContext.getEntity(
    {
      kernel:new TestKernel(appName, appCode, __dirname, (k) => new ELogger(k)),
      cleanUp:true
    }
);

setupDevKernel(kernel);

TestLib.testStart();
TestLib.testCore();
TestLib.testDb();
TestLib.testEnd();
TestLib.testOrm();
