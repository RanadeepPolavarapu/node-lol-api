import winston from 'winston';
import requestPromise from 'request-promise';

const LOGGER = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            timestamp: (() => new Date().toISOString()),

            formatter: (options => options.timestamp() + ' ' + options.level.toUpperCase() + ' ' +
                (options.message !== undefined ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t' +
                    JSON.stringify(options.meta) : '')),
        }),
    ],
});

LOGGER.info('Initialized Winston logger');

async function main() {
    try {
        LOGGER.info(await requestPromise('http://google.ca'));
    } catch (err) {
        LOGGER.error(err);
    }
}

main();
