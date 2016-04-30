'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
        this.STATIC_ENDPOINT_TEMPLATE = 'https://global.api.pvp.net/';
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
        key: '_buildStaticAPIRequestURL',
        value: function _buildStaticAPIRequestURL(route) {
            var region = arguments.length <= 1 || arguments[1] === undefined ? this.region : arguments[1];
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            var baseURLFormatted = 'https://global.api.pvp.net/';
            var routeFormatted = route.replace('{region}', region.toLowerCase());

            options.api_key = this.apiKey;

            var routeQuerystring = _querystring2.default.stringify(options);
            var finalURLFormatted = _url2.default.resolve(baseURLFormatted, routeFormatted) + '?' + routeQuerystring;

            _logger2.default.debug('fn: ' + this._buildStaticAPIRequestURL.name + '(\n            route: ' + route + ',\n            region: ' + region + ',\n            options: ' + _util2.default.inspect(options) + '): URL=' + finalURLFormatted);

            return finalURLFormatted;
        }
    }, {
        key: '_buildStatusAPIRequestURL',
        value: function _buildStatusAPIRequestURL(route) {
            var region = arguments.length <= 1 || arguments[1] === undefined ? this.region : arguments[1];
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            var baseURLFormatted = 'https://status.leagueoflegends.com/';
            var routeFormatted = route.replace('{region}', region.toLowerCase());

            options.api_key = this.apiKey;

            var routeQuerystring = _querystring2.default.stringify(options);
            var finalURLFormatted = _url2.default.resolve(baseURLFormatted, routeFormatted) + '?' + routeQuerystring;

            _logger2.default.debug('fn: ' + this._buildStatusAPIRequestURL.name + '(\n            route: ' + route + ',\n            region: ' + region + ',\n            options: ' + _util2.default.inspect(options) + '): URL=' + finalURLFormatted);

            return finalURLFormatted;
        }
    }, {
        key: 'getAllChampions',
        value: function getAllChampions(region, freeToPlay) {
            var route = '/api/lol/' + region.toLowerCase() + '/v1.2/champion';

            var finalURL = this._buildAPIRequestURL(route, region, {
                freeToPlay: freeToPlay
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getChampionByChampionId',
        value: function getChampionByChampionId(region) {
            var championId = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v1.2/champion/' + (championId ? championId : 1);
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
            var route = '/api/lol/' + region.toLowerCase() + '/v1.3/game/by-summoner/' + summonerId + '/recent';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeaguesBySummonerIds',
        value: function getLeaguesBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.5/league/by-summoner/' + summonerIds;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeagueEntryBySummonerIds',
        value: function getLeagueEntryBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.5/league/by-summoner/' + summonerIds + '/entry';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeaguesByTeamIds',
        value: function getLeaguesByTeamIds(region) {
            var teamIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.5/league/by-team/' + teamIds;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeagueEntryByTeamIds',
        value: function getLeagueEntryByTeamIds(region) {
            var teamIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.5/league/by-team/' + teamIds + '/entry';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeaguesChallengerTier',
        value: function getLeaguesChallengerTier(region) {
            var queueType = arguments.length <= 1 || arguments[1] === undefined ? 'RANKED_SOLO_5x5' : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.5/league/challenger';
            var finalURL = this._buildAPIRequestURL(route, region, {
                type: queueType
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getLeaguesMasterTier',
        value: function getLeaguesMasterTier(region) {
            var queueType = arguments.length <= 1 || arguments[1] === undefined ? 'RANKED_SOLO_5x5' : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.5/league/master';
            var finalURL = this._buildAPIRequestURL(route, region, {
                type: queueType
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllChampionData',
        value: function getStaticAllChampionData(region, locale, version, dataById, champData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/champion';
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                dataById: dataById,
                champData: champData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticChampionDataByChampionId',
        value: function getStaticChampionDataByChampionId(region, championId, locale, version, champData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/champion/' + championId;
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                champData: champData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllItemData',
        value: function getStaticAllItemData(region, locale, version, itemListData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/item';
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                itemListData: itemListData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticItemDataByItemId',
        value: function getStaticItemDataByItemId(region, itemId, locale, version, itemData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/item';
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                itemData: itemData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllLanguageStringsData',
        value: function getStaticAllLanguageStringsData(region, locale, version) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/language-strings';
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllLanguagesData',
        value: function getStaticAllLanguagesData(region) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/languages';
            var finalURL = this._buildStaticAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllMapData',
        value: function getStaticAllMapData(region, locale, version) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/map';
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllMasteryData',
        value: function getStaticAllMasteryData(region, locale, version, masteryListData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/mastery';
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                masteryListData: masteryListData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticMasteryDataByMasterId',
        value: function getStaticMasteryDataByMasterId(region, masteryId, locale, version, masteryData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/mastery/' + masteryId;
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                masteryData: masteryData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllRealmsData',
        value: function getStaticAllRealmsData(region) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/realm';
            var finalURL = this._buildStaticAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllRunesData',
        value: function getStaticAllRunesData(region, locale, version, runeListData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/rune';
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                runeListData: runeListData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticRuneDataByRuneId',
        value: function getStaticRuneDataByRuneId(region, runeId, locale, version, runeData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/rune/' + runeId;
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                runeData: runeData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllSummonerSpellsData',
        value: function getStaticAllSummonerSpellsData(region, locale, version, dataById, spellData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/summoner-spell';
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                dataById: dataById,
                spellData: spellData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticSummonerSpellDataBySummonerId',
        value: function getStaticSummonerSpellDataBySummonerId(region, summonerSpellId, locale, version, spellData) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/summoner-spell/' + summonerSpellId;
            var finalURL = this._buildStaticAPIRequestURL(route, region, {
                locale: locale,
                version: version,
                spellData: spellData
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStaticAllVersionsData',
        value: function getStaticAllVersionsData(region) {
            var route = '/api/lol/static-data/' + region.toLowerCase() + '/v1.2/versions';
            var finalURL = this._buildStaticAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStatusAllShardsData',
        value: function getStatusAllShardsData() {
            var route = '/shards';
            var finalURL = this._buildStatusAPIRequestURL(route);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getStatusShardDataByRegion',
        value: function getStatusShardDataByRegion(region) {
            var route = '/shards/' + region.toLowerCase();
            var finalURL = this._buildStatusAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getMatchByMatchId',
        value: function getMatchByMatchId(region, matchId, includeTimeline) {
            var route = '/api/lol/' + region.toLowerCase() + '/v2.2/match/' + matchId;
            var finalURL = this._buildAPIRequestURL(route, region, {
                includeTimeline: includeTimeline
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getMatchListBySummonerId',
        value: function getMatchListBySummonerId(region, summonerId) {
            var championIds = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
            var rankedQueues = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
            var seasons = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
            var beginTime = arguments[5];
            var endTime = arguments[6];
            var beginIndex = arguments[7];
            var endIndex = arguments[8];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.2/matchlist/by-summoner/' + summonerId;
            var finalURL = this._buildAPIRequestURL(route, region, {
                championIds: championIds,
                rankedQueues: rankedQueues,
                seasons: seasons,
                beginTime: beginTime,
                endTime: endTime,
                beginIndex: beginIndex,
                endIndex: endIndex
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getRankedStatsBySummonerId',
        value: function getRankedStatsBySummonerId(region, summonerId, season) {
            var route = '/api/lol/' + region.toLowerCase() + '/v1.3/stats/by-summoner/' + summonerId + '/ranked';
            var finalURL = this._buildAPIRequestURL(route, region, {
                season: season
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getPlayerStatsSummariesBySummonerId',
        value: function getPlayerStatsSummariesBySummonerId(region, summonerId, season) {
            var route = '/api/lol/' + region.toLowerCase() + '/v1.3/stats/by-summoner/' + summonerId + '/summary';
            var finalURL = this._buildAPIRequestURL(route, region, {
                season: season
            });

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getSummonerObjectsDataBySummonerNames',
        value: function getSummonerObjectsDataBySummonerNames(region) {
            var summonerNames = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v1.4/summoner/by-name/' + summonerNames;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getSummonerObjectsDataBySummonerIds',
        value: function getSummonerObjectsDataBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v1.4/summoner/' + summonerIds;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getSummonerMasteryPagesBySummonerIds',
        value: function getSummonerMasteryPagesBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v1.4/summoner/' + summonerIds + '/masteries';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getSummonerNamesBySummonerIds',
        value: function getSummonerNamesBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v1.4/summoner/' + summonerIds + '/name';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getSummonerRunePagesBySummonerIds',
        value: function getSummonerRunePagesBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v1.4/summoner/' + summonerIds + '/runes';
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getTeamsBySummonerIds',
        value: function getTeamsBySummonerIds(region) {
            var summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.4/team/by-summoner/' + summonerIds;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }, {
        key: 'getTeamsByTeamIds',
        value: function getTeamsByTeamIds(region) {
            var teamIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var route = '/api/lol/' + region.toLowerCase() + '/v2.4/team/' + teamIds;
            var finalURL = this._buildAPIRequestURL(route, region);

            return this._makeAPIRequest(finalURL);
        }
    }]);

    return LoLAPIClient;
}();

exports.default = LoLAPIClient;