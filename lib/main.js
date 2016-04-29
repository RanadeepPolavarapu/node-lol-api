'use strict';

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

class LoLAPIClient {
    constructor(apiKey, region) {
        this.apiKey = apiKey;
        this.region = region;
        this.REGIONAL_ENDPOINT_HOST_TEMPLATE = `https://{region}.api.pvp.net/`;
        this.REGIONAL_ENDPOINTS = {
            BR: {
                platformId: 'BR1',
                name: 'Brazil'
            },
            EUNE: {
                platformId: 'EUN1',
                name: 'Europe Nordic & East'
            },
            EUW: {
                platformId: 'EUW1',
                name: 'Europe West'
            },
            JP: {
                platformId: 'JP1',
                name: 'Japan'
            },
            KR: {
                platformId: 'KR',
                name: 'Korea'
            },
            LAN: {
                platformId: 'LA1',
                name: 'Latin America North'
            },
            LAS: {
                platformId: 'LA2',
                name: 'Latin America South'
            },
            NA: {
                platformId: 'NA1',
                name: 'North America'
            },
            OCE: {
                platformId: 'OC1',
                name: 'Oceania'
            },
            TR: {
                platformId: 'TR1',
                name: 'Turkey'
            },
            RU: {
                platformId: 'RU',
                name: 'Russia'
            },
            PBE: {
                platformId: 'PBE1',
                name: 'Public Beta Environment'
            }
        };
    }

    _makeAPIRequest(url) {
        return _asyncToGenerator(function* () {
            let response = yield _requestPromise2.default.get(url);

            return console.log(response);
        })();
    }

    // _buildAPIRequestURL(route, region, options) {
    //
    // }

    getChampions(region, freeToPlay) {
        let hostBaseUrl = region ? `https://${ region }.api.pvp.net/` : `https://${ this.region }.api.pvp.net/`;
        let route = region ? '/api/lol/{region}/v1.2/champion'.replace('{region}', region) : '/api/lol/{region}/v1.2/champion'.replace('{region}', this.region);
        let routeQuerystring = _querystring2.default.stringify({
            freeToPlay: freeToPlay,
            api_key: this.apiKey
        });

        let finalURL = _url2.default.resolve(hostBaseUrl, route) + '?' + routeQuerystring;
        return this._makeAPIRequest(finalURL);
    }
}

let lol = new LoLAPIClient('abee5b6a-41b5-4be4-8d50-bd19cd4da6d5', 'NA');
_logger2.default.info(lol.getChampions('jp', true));