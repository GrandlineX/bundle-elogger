import * as Path from 'path';
import {createFolderIfNotExist, removeFolderIfExist, sleep} from "@grandlinex/core";
import { TestKernel} from './DebugClasses';


const appName = 'TestKernel';
const appCode = 'tkernel';
const msiPath = Path.join(__dirname, '..', 'data');
const testPath = Path.join(__dirname, '..', 'data', 'config');


createFolderIfNotExist(msiPath);
createFolderIfNotExist(testPath);


let kernel = new TestKernel(appName, appCode, testPath);

const testText = 'hello_world';

describe('Clean start', () => {
    test('preload', async () => {
        expect(kernel.getState()).toBe('init');
    });
    test('start kernel', async () => {
        const result = await kernel.start();
        expect(result).toBe(true);
        expect(kernel.getModCount()).toBe(1);
        expect(kernel.getState()).toBe('running');
    });
})

describe('Kernel - Logger', () => {
    test('log', async () => {
        kernel.log("log")
        expect(true).toBeTruthy();
    });
    test('warn', async () => {
        kernel.warn("warn")
        expect(true).toBeTruthy();
    });
    test('error', async () => {
        kernel.error("error")
        expect(true).toBeTruthy();
    });
    test('debug', async () => {
        kernel.debug("debug")
        expect(true).toBeTruthy();
    });
})
describe('KernelModule - Logger', () => {
    test('log', async () => {
        kernel.getModule().log("log")
        expect(true).toBeTruthy();
    });
    test('warn', async () => {
        kernel.getModule().warn("warn")
        expect(true).toBeTruthy();
    });
    test('error', async () => {
        kernel.getModule().error("error")
        expect(true).toBeTruthy();
    });
    test('debug', async () => {
        kernel.getModule().debug("debug")
        expect(true).toBeTruthy();
    });
})


describe("ShutDown", () => {

    test('exit kernel', async () => {
        const result = await kernel.stop();

        await sleep(1000);

        expect(kernel.getState()).toBe('exited');

        expect(result).toBeTruthy();
    });

    test('cleanup', async () => {

        expect(removeFolderIfExist(testPath)).not.toBeFalsy()
    });
})

