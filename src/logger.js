import winston from 'winston';

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

export default LOGGER;
