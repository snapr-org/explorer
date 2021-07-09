require('dotenv').config();

module.exports = {
  //evidence of use not found
  //substrateNetwork: process.env.SUBSTRATE_NETWORK || 'snapr',
  wsProviderUrl: process.env.WS_PROVIDER_URL || 'wss://ford.snapr.net',
  dbConnectionParameters: {
    user: process.env.DB_USER || 'snapr',
    host: process.env.DB_HOST || 'mysql',
    database: process.env.DB_SCHEMA || 'snapr',
    password: process.env.DB_PASSWORD || 'snapr',
    port: process.env.DB_PORT || 5432,
  },
  crawlers: [
    {
      enabled: !process.env.CRAWLER_BLOCK_LISTENER_DISABLE,
      // eslint-disable-next-line global-require
      module: require('./src/crawlers/blockListener'),
    },
    {
      enabled: !process.env.CRAWLER_BLOCK_HARVESTER_DISABLE,
      // eslint-disable-next-line global-require
      module: require('./src/crawlers/blockHarvester'),
      config: {
        startDelay: 60 * 1000,
        pollingTime:
          parseInt(process.env.CRAWLER_BLOCK_LISTENER_POLLING_TIME_MS, 10)
          || 60 * 60 * 1000,
      },
    },
    {
      enabled: !process.env.CRAWLER_ACTIVE_ACCOUNTS_DISABLE,
      // eslint-disable-next-line global-require
      module: require('./src/crawlers/activeAccounts'),
      config: {
        startDelay: 30 * 1000,
        pollingTime:
          parseInt(process.env.CRAWLER_ACTIVE_ACCOUNTS_POLLING_TIME_MS, 10)
          || 30 * 60 * 1000,
      },
    },
  ],
};
