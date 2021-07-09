// @ts-check
const pino = require('pino');
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Pool } = require('pg');
const types = require('./assets/types.json');
const { wait } = require('./utils.js');

const logger = pino();

class Backend {
  constructor(config) {
    this.config = config;
    this.nodeisSyncing = true;
  }

  async runCrawlers() {
    logger.info('starting backend, waiting 15s...');
    await wait(15000);

    const pool = await this.getPool();

    let api = await this.getChainWsProvider();
    while (!api) {
      // eslint-disable-next-line no-await-in-loop
      await wait(10000);
      // eslint-disable-next-line no-await-in-loop
      api = await this.getChainWsProvider();
    }

    logger.info('running crawlers');

    this.config.crawlers
      .filter((crawler) => crawler.enabled)
      .forEach(
        (crawler) => crawler.module.start(
          this.config.wsProviderUrl,
          pool,
          crawler.config,
          //evidence of use not found
          //this.config.substrateNetwork,
        ),
      );
  }

  async getChainWsProvider() {
    logger.info(`connecting to ${this.config.wsProviderUrl}`);

    const provider = new WsProvider(this.config.wsProviderUrl);
    const api = await ApiPromise.create({ provider, types });
    await api.isReady;

    logger.info(`api (${this.config.wsProviderUrl}) is ready`);

    // wait for node is synced
    let node;
    try {
      node = await api.rpc.system.health();
    } catch {
      logger.error("can't connect to node! waiting 10s...");
      api.disconnect();
      await wait(10000);
      return false;
    }

    logger.info(`Node: ${JSON.stringify(node)}`);

    if (node && node.isSyncing.eq(false)) {
      // node is synced!
      logger.info('node is synced!');
      this.nodeisSyncing = false;
      return api;
    }
    logger.warn('node is not synced! waiting 10s...');
    api.disconnect();
    await wait(10000);

    return false;
  }

  async getPool() {
    const pool = new Pool(this.config.dbConnectionParameters);
    await pool.connect();
    return pool;
  }
}

module.exports = Backend;
