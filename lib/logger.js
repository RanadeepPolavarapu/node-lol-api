'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG = JSON.parse(_fs2.default.readFileSync('config.json'));
const LOGGER_LEVEL = process.env.LOGGER_LEVEL || CONFIG.logging.loggerLevel;

const LOGGER = new _winston2.default.Logger({
    transports: [new _winston2.default.transports.Console({
        timestamp: () => new Date().toISOString(),

        formatter: options => options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message !== undefined ? options.message : '') + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : ''),

        level: LOGGER_LEVEL
    })]
});

exports.default = LOGGER;