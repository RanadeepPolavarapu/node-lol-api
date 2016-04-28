import requestPromise from 'request-promise';

import LOGGER from './logger';

LOGGER.info('Initialized Winston logger');

async function main() {
    try {
        LOGGER.info(await requestPromise('http://googleeee.ca'));
    } catch (err) {
        LOGGER.error(err);
    }
}

main();
