# snapr explorer

Open source block explorer for [snapr](https://snapr.org) hosted at [https://explorer.snapr.com](https://explorer.snapr.com)

## Dependencies

You will need `nodejs` and `yarn`, `docker` and `docker-compose`.

## Install

Install mono-repo:

```bash
git clone https://github.com/snapr-org/explorer.git
cd explorer
yarn
```

### Frontend

First, copy the proper frontend configuration file (mainnet or testnet):

#### Mainnet

```bash
cp frontend/frontend.config.mainnet.sample.js frontend/frontend.config.js
```

#### Testnet

```bash
cp frontend/frontend.config.tesnet.sample.js frontend/frontend.config.js
```

#### Start development frontend with hot reload

```bash
yarn workspace frontend dev
```

#### Generate static version

```bash
yarn workspace frontend generate
```

### Backend

To build and start all the required dockers.

#### Mainnet

```bash
yarn workspace backend docker:mainnet
```

#### Testnet

```bash
yarn workspace backend docker:testnet
```

#### Clean docker containers

Clean all docker containers and related images and persistent volumes except those related to `substrate-node`.

```bash
yarn workspace backend docker:clean
```

#### Database backup

Create PostgreSQL database backup:

```bash
docker:postgres:backup
```

#### Create snapr blockchain database backup

```bash
bash docker/backend/scripts/backup.sh
```

#### Restore snapr blockchain database backup

```bash
bash docker/backend/scripts/restore-backup.sh
```