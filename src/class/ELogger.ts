import * as Path from 'path';
import { CoreLogger, ICoreKernel } from '@grandlinex/core';
import * as log from 'electron-log';

export default class ELogger extends CoreLogger {
  logger: Map<string, log.LogFunctions>;

  logError: undefined | ((message: string) => void);

  constructor(kernel: ICoreKernel<any>, error?: (message: string) => void) {
    super();
    const store = kernel.getConfigStore();
    const lPath = store.get('GLOBAL_PATH_LOG');
    const path = lPath || store.get('GLOBAL_PATH_TEMP');
    if (!path) {
      throw new Error('No log path');
    }
    this.logError = error;
    log.transports.file.resolvePathFn = () => Path.join(path, 'main.log');
    // this.logger = log.scope(scope);
    this.logger = new Map<string, log.LogFunctions>();

    this.log = this.log.bind(this);
    this.error = this.error.bind(this);
    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.verbose = this.verbose.bind(this);
  }

  getLogger(channel: string): log.LogFunctions {
    if (this.logger.has(channel)) {
      return this.logger.get(channel) as log.LogFunctions;
    }
    const scope = log.scope(channel);
    this.logger.set(channel, scope);
    return scope;
  }

  log(channel: string, ...ags: unknown[]): void {
    this.cbp(() => this.getLogger(channel).log(ags));
  }

  debug(channel: string, ...ags: unknown[]): void {
    this.cbp(() => this.getLogger(channel).debug(ags));
  }

  info(channel: string, ...ags: unknown[]): void {
    this.cbp(() => this.getLogger(channel).info(ags));
  }

  error(channel: string, ...ags: unknown[]): void {
    this.cbp(() => this.getLogger(channel).error(ags));
  }

  warn(channel: string, ...ags: unknown[]): void {
    this.cbp(() => this.getLogger(channel).warn(ags));
  }

  verbose(channel: string, ...ags: unknown[]): void {
    this.cbp(() => this.getLogger(channel).verbose(ags));
  }

  /*
   * catchBrokenPipe
   */
  cbp(fc: () => void) {
    try {
      fc();
    } catch (e) {
      this.logError?.(`ELogger: Broken pipe ${new Date().toString()}`);
      console.error(`ELogger: Broken pipe ${new Date().toString()}`);
      console.error(e);
    }
  }
}
