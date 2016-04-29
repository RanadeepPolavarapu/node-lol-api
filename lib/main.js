'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoLAPIClient = function () {
    function LoLAPIClient(apiKey) {
        var region = arguments.length <= 1 || arguments[1] === undefined ? 'NA' : arguments[1];

        _classCallCheck(this, LoLAPIClient);

        this.apiKey = apiKey;
        this.region = region;
        this.REGIONAL_ENDPOINT_HOST_TEMPLATE = 'https://{region}.api.pvp.net/';
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

    _createClass(LoLAPIClient, [{
        key: '_makeAPIRequest',
        value: function _makeAPIRequest(url) {
            var requestPromiseOptions = {
                uri: url,
                json: true
            };

            var apiRequestPromise = (0, _requestPromise2.default)(requestPromiseOptions);
            return apiRequestPromise;
        }
    }, {
        key: '_buildAPIRequestURL',
        value: function _buildAPIRequestURL(route) {
            var region = arguments.length <= 1 || arguments[1] === undefined ? this.region : arguments[1];
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            var baseURLFormatted = 'https://' + region + '.api.pvp.net/';
            var routeFormatted = route.replace('{region}', region.toLowerCase());

            options.api_key = this.apiKey;

            var routeQuerystring = _querystring2.default.stringify(options);
            var finalURLFormatted = _url2.default.resolve(baseURLFormatted, routeFormatted) + '?' + routeQuerystring;

            _logger2.default.debug('fn: ' + this._buildAPIRequestURL.name + '(\n            route: ' + route + ',\n            region: ' + region + ',\n            options: ' + _util2.default.inspect(options) + '): URL=' + finalURLFormatted);

            return finalURLFormatted;
        }
    }, {
        key: 'getAllChampions',
        value: function getAllChampions(region, freeToPlay) {
            var route = '/api/lol/{region}/v1.2/champion';

            var finalURL = this._buildAPIRequestURL(route, region, {
                freeToPlay: freeToPlay
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getChampionByChampionId',
        value: function getChampionByChampionId(region) {
            var championId = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            var route = '/api/lol/{region}/v1.2/champion/' + (championId ? championId : 1);
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getChampionMasteryBySummonerIdAndChampionId',
        value: function getChampionMasteryBySummonerIdAndChampionId(region, summonerId, championId) {
            var platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
            var route = '/championmastery/location/' + platformId + '/player/' + summonerId + '/champion/' + championId;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getAllChampionMasteryEntriesBySummonerId',
        value: function getAllChampionMasteryEntriesBySummonerId(region, summonerId) {
            var platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
            var route = '/championmastery/location/' + platformId + '/player/' + summonerId + '/champions';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getTotalChampionMasteryScoreBySummonerId',
        value: function getTotalChampionMasteryScoreBySummonerId(region, summonerId) {
            var platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
            var route = '/championmastery/location/' + platformId + '/player/' + summonerId + '/score';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getTopChampionMasteryEntriesBySummonerId',
        value: function getTopChampionMasteryEntriesBySummonerId(region, summonerId, count) {
            var platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
            var route = '/championmastery/location/' + platformId + '/player/' + summonerId + '/topchampions';
            var finalURL = this._buildAPIRequestURL(route, region, {
                count: count
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getCurrentGameBySummonerId',
        value: function getCurrentGameBySummonerId(region, summonerId) {
            var platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
            var route = '/observer-mode/rest/consumer/getSpectatorGameInfo/' + platformId + '/' + summonerId;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getFeaturedGames',
        value: function getFeaturedGames(region) {
            var route = '/observer-mode/rest/featured';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getRecentGamesBySummonerId',
        value: function getRecentGamesBySummonerId(region, summonerId) {
            var route = '/api/lol/' + region + '/v1.3/game/by-summoner/' + summonerId + '/recent';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeaguesBySummonerIds',
        value: function getLeaguesBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region + '/v2.5/league/by-summoner/' + summonerIds;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeagueEntryBySummonerIds',
        value: function getLeagueEntryBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region + '/v2.5/league/by-summoner/' + summonerIds + '/entry';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeaguesByTeamIds',
        value: function getLeaguesByTeamIds(region) {
            var teamIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region + '/v2.5/league/by-team/' + teamIds;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeagueEntryByTeamIds',
        value: function getLeagueEntryByTeamIds(region) {
            var teamIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region + '/v2.5/league/by-team/' + teamIds + '/entry';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeaguesChallengerTier',
        value: function getLeaguesChallengerTier(region) {
            var queueType = arguments.length <= 1 || arguments[1] === undefined ? 'RANKED_SOLO_5x5' : arguments[1];

            var route = '/api/lol/' + region + '/v2.5/league/challenger';
            var finalURL = this._buildAPIRequestURL(route, region, {
                type: queueType
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeaguesMasterTier',
        value: function getLeaguesMasterTier(region) {
            var queueType = arguments.length <= 1 || arguments[1] === undefined ? 'RANKED_SOLO_5x5' : arguments[1];

            var route = '/api/lol/' + region + '/v2.5/league/master';
            var finalURL = this._buildAPIRequestURL(route, region, {
                type: queueType
            });

            return this._makeAPIRequest(finalURL);
        }
    }]);

    return LoLAPIClient;
}();

var lol = new LoLAPIClient('abee5b6a-41b5-4be4-8d50-bd19cd4da6d5', 'NA');

// lol.getChampions('TR', true).then(response => console.log(response));
lol.getChampionByChampionId('TR', 2).then(function (response) {
    return console.log(response);
}).catch(function (err) {
    return _logger2.default.error(err);
});

lol.getChampionMasteryBySummonerIdAndChampionId('na', 5908, 1).then(function (response) {
    return console.log(response);
}).catch(function (err) {
    return _logger2.default.error(err);
});

lol.getLeaguesBySummonerIds('na', [5908, 2, 8]).then(function (response) {
    return console.log(response);
}).catch(function (err) {
    return _logger2.default.error(err);
});

// LOGGER.info(lol.getChampionById('kr'));