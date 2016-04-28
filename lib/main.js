'use strict';

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _winston2.default.Logger({
    transports: [new _winston2.default.transports.Console({
        timestamp: () => Date.now(),

        formatter: options => options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message !== undefined ? options.message : '') + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')
    })]
});

logger.info('A');