import * as Path from 'path';
import { CoreLogger, ICoreKernel } from '@grandlinex/core';
import * as log from 'electron-log';

export default class ELogger extends CoreLogger {
  logger: Map<string, log.LogFunctions>;

  constructor(kernel: ICoreKernel<any>) {
    super();
    const store = kernel.getConfigStore();
    const path = store.get('GLOBAL_PATH_TEMP');
    if (!path) {
      throw new Error('No log path');
    }
    log.transports.file.resolvePath = () => Path.join(path, 'main.log');
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
    this.getLogger(channel).log(ags);
  }

  debug(channel: string, ...ags: unknown[]): void {
    this.getLogger(channel).debug(ags);
  }

  info(channel: string, ...ags: unknown[]): void {
    this.getLogger(channel).info(ags);
  }

  error(channel: string, ...ags: unknown[]): void {
    this.getLogger(channel).error(ags);
  }

  warn(channel: string, ...ags: unknown[]): void {
    this.getLogger(channel).warn(ags);
  }

  verbose(channel: string, ...ags: unknown[]): void {
    this.getLogger(channel).verbose(ags);
  }
}
