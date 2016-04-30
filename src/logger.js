import fs from 'fs';
import winston from 'winston';

const CONFIG = JSON.parse(fs.readFileSync('config.json'));
const LOGGER_LEVEL = process.env.LOGGER_LEVEL || CONFIG.logging.loggerLevel;

const LOGGER = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            timestamp: (() => new Date().toISOString()),

            formatter: (options => options.timestamp() + ' ' + options.level.toUpperCase() + ' ' +
                (options.message !== undefined ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t' +
                    JSON.stringify(options.meta) : '')),

            level: LOGGER_LEVEL,
        }),
    ],
});

export default LOGGER;
