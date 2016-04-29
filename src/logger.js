import winston from 'winston';
import fs from 'fs';

const CONFIG = JSON.parse(fs.readFileSync('config.json'));

const LOGGER = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            timestamp: (() => new Date().toISOString()),

            formatter: (options => options.timestamp() + ' ' + options.level.toUpperCase() + ' ' +
                (options.message !== undefined ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t' +
                    JSON.stringify(options.meta) : '')),

            level: CONFIG.logging.loggerLevel,
        }),
    ],
});

export default LOGGER;
