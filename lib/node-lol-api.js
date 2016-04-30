'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoLAPIClient {
    constructor(apiKey) {
        let region = arguments.length <= 1 || arguments[1] === undefined ? 'NA' : arguments[1];

        this.apiKey = apiKey;
        this.region = region;
        this.REGIONAL_ENDPOINT_HOST_TEMPLATE = `https://{region}.api.pvp.net/`;
        this.STATIC_ENDPOINT_TEMPLATE = `https://global.api.pvp.net/`;
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
        let requestPromiseOptions = {
            uri: url,
            json: true
        };

        let apiRequestPromise = (0, _requestPromise2.default)(requestPromiseOptions);
        return apiRequestPromise;
    }

    _buildAPIRequestURL(route) {
        let region = arguments.length <= 1 || arguments[1] === undefined ? this.region : arguments[1];
        let options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        let baseURLFormatted = `https://${ region }.api.pvp.net/`;
        let routeFormatted = route.replace('{region}', region.toLowerCase());

        options.api_key = this.apiKey;

        let routeQuerystring = _querystring2.default.stringify(options);
        let finalURLFormatted = _url2.default.resolve(baseURLFormatted, routeFormatted) + '?' + routeQuerystring;

        _logger2.default.debug(`fn: ${ this._buildAPIRequestURL.name }(
            route: ${ route },
            region: ${ region },
            options: ${ _util2.default.inspect(options) }): URL=${ finalURLFormatted }`);

        return finalURLFormatted;
    }

    _buildStaticAPIRequestURL(route) {
        let region = arguments.length <= 1 || arguments[1] === undefined ? this.region : arguments[1];
        let options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        let baseURLFormatted = `https://global.api.pvp.net/`;
        let routeFormatted = route.replace('{region}', region.toLowerCase());

        options.api_key = this.apiKey;

        let routeQuerystring = _querystring2.default.stringify(options);
        let finalURLFormatted = _url2.default.resolve(baseURLFormatted, routeFormatted) + '?' + routeQuerystring;

        _logger2.default.debug(`fn: ${ this._buildStaticAPIRequestURL.name }(
            route: ${ route },
            region: ${ region },
            options: ${ _util2.default.inspect(options) }): URL=${ finalURLFormatted }`);

        return finalURLFormatted;
    }

    _buildStatusAPIRequestURL(route) {
        let region = arguments.length <= 1 || arguments[1] === undefined ? this.region : arguments[1];
        let options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        let baseURLFormatted = `https://status.leagueoflegends.com/`;
        let routeFormatted = route.replace('{region}', region.toLowerCase());

        options.api_key = this.apiKey;

        let routeQuerystring = _querystring2.default.stringify(options);
        let finalURLFormatted = _url2.default.resolve(baseURLFormatted, routeFormatted) + '?' + routeQuerystring;

        _logger2.default.debug(`fn: ${ this._buildStatusAPIRequestURL.name }(
            route: ${ route },
            region: ${ region },
            options: ${ _util2.default.inspect(options) }): URL=${ finalURLFormatted }`);

        return finalURLFormatted;
    }

    getAllChampions(region, freeToPlay) {
        let route = `/api/lol/${ region.toLowerCase() }/v1.2/champion`;

        let finalURL = this._buildAPIRequestURL(route, region, {
            freeToPlay: freeToPlay
        });

        return this._makeAPIRequest(finalURL);
    }

    getChampionByChampionId(region, championId) {
        let route = `/api/lol/${ region.toLowerCase() }/v1.2/champion/${ championId ? championId : 1 }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getChampionMasteryBySummonerIdAndChampionId(region, summonerId, championId) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route = `/championmastery/location/${ platformId }/player/${ summonerId }/champion/${ championId }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getAllChampionMasteryEntriesBySummonerId(region, summonerId) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route = `/championmastery/location/${ platformId }/player/${ summonerId }/champions`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getTotalChampionMasteryScoreBySummonerId(region, summonerId) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route = `/championmastery/location/${ platformId }/player/${ summonerId }/score`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getTopChampionMasteryEntriesBySummonerId(region, summonerId, count) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route = `/championmastery/location/${ platformId }/player/${ summonerId }/topchampions`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            count: count
        });

        return this._makeAPIRequest(finalURL);
    }

    getCurrentGameBySummonerId(region, summonerId) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route = `/observer-mode/rest/consumer/getSpectatorGameInfo/${ platformId }/${ summonerId }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getFeaturedGames(region) {
        let route = `/observer-mode/rest/featured`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getRecentGamesBySummonerId(region, summonerId) {
        let route = `/api/lol/${ region.toLowerCase() }/v1.3/game/by-summoner/${ summonerId }/recent`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeaguesBySummonerIds(region) {
        let summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v2.5/league/by-summoner/${ summonerIds }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeagueEntryBySummonerIds(region) {
        let summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v2.5/league/by-summoner/${ summonerIds }/entry`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeaguesByTeamIds(region) {
        let teamIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v2.5/league/by-team/${ teamIds }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeagueEntryByTeamIds(region) {
        let teamIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v2.5/league/by-team/${ teamIds }/entry`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeaguesChallengerTier(region) {
        let queueType = arguments.length <= 1 || arguments[1] === undefined ? 'RANKED_SOLO_5x5' : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v2.5/league/challenger`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            type: queueType
        });

        return this._makeAPIRequest(finalURL);
    }

    getLeaguesMasterTier(region) {
        let queueType = arguments.length <= 1 || arguments[1] === undefined ? 'RANKED_SOLO_5x5' : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v2.5/league/master`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            type: queueType
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllChampionData(region, locale, version, dataById, champData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/champion`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            dataById: dataById,
            champData: champData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticChampionDataByChampionId(region, championId, locale, version, champData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/champion/${ championId }`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            champData: champData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllItemData(region, locale, version, itemListData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/item`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            itemListData: itemListData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticItemDataByItemId(region, itemId, locale, version, itemData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/item`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            itemData: itemData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllLanguageStringsData(region, locale, version) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/language-strings`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllLanguagesData(region) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/languages`;
        let finalURL = this._buildStaticAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllMapData(region, locale, version) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/map`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllMasteryData(region, locale, version, masteryListData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/mastery`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            masteryListData: masteryListData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticMasteryDataByMasterId(region, masteryId, locale, version, masteryData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/mastery/${ masteryId }`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            masteryData: masteryData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllRealmsData(region) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/realm`;
        let finalURL = this._buildStaticAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllRunesData(region, locale, version, runeListData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/rune`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            runeListData: runeListData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticRuneDataByRuneId(region, runeId, locale, version, runeData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/rune/${ runeId }`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            runeData: runeData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllSummonerSpellsData(region, locale, version, dataById, spellData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/summoner-spell`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            dataById: dataById,
            spellData: spellData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticSummonerSpellDataBySummonerId(region, summonerSpellId, locale, version, spellData) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/summoner-spell/${ summonerSpellId }`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            spellData: spellData
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllVersionsData(region) {
        let route = `/api/lol/static-data/${ region.toLowerCase() }/v1.2/versions`;
        let finalURL = this._buildStaticAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getStatusAllShardsData() {
        let route = `/shards`;
        let finalURL = this._buildStatusAPIRequestURL(route);

        return this._makeAPIRequest(finalURL);
    }

    getStatusShardDataByRegion(region) {
        let route = `/shards/${ region.toLowerCase() }`;
        let finalURL = this._buildStatusAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getMatchByMatchId(region, matchId, includeTimeline) {
        let route = `/api/lol/${ region.toLowerCase() }/v2.2/match/${ matchId }`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            includeTimeline: includeTimeline
        });

        return this._makeAPIRequest(finalURL);
    }

    getMatchListBySummonerId(region, summonerId) {
        let championIds = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
        let rankedQueues = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
        let seasons = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
        let beginTime = arguments[5];
        let endTime = arguments[6];
        let beginIndex = arguments[7];
        let endIndex = arguments[8];

        let route = `/api/lol/${ region.toLowerCase() }/v2.2/matchlist/by-summoner/${ summonerId }`;
        let finalURL = this._buildAPIRequestURL(route, region, {
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

    getRankedStatsBySummonerId(region, summonerId, season) {
        let route = `/api/lol/${ region.toLowerCase() }/v1.3/stats/by-summoner/${ summonerId }/ranked`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            season: season
        });

        return this._makeAPIRequest(finalURL);
    }

    getPlayerStatsSummariesBySummonerId(region, summonerId, season) {
        let route = `/api/lol/${ region.toLowerCase() }/v1.3/stats/by-summoner/${ summonerId }/summary`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            season: season
        });

        return this._makeAPIRequest(finalURL);
    }

    getSummonerObjectsDataBySummonerNames(region) {
        let summonerNames = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v1.4/summoner/by-name/${ summonerNames }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getSummonerObjectsDataBySummonerIds(region) {
        let summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v1.4/summoner/${ summonerIds }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getSummonerMasteryPagesBySummonerIds(region) {
        let summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v1.4/summoner/${ summonerIds }/masteries`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getSummonerNamesBySummonerIds(region) {
        let summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v1.4/summoner/${ summonerIds }/name`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getSummonerRunePagesBySummonerIds(region) {
        let summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v1.4/summoner/${ summonerIds }/runes`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getTeamsBySummonerIds(region) {
        let summonerIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v2.4/team/by-summoner/${ summonerIds }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getTeamsByTeamIds(region) {
        let teamIds = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        let route = `/api/lol/${ region.toLowerCase() }/v2.4/team/${ teamIds }`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }
}
exports.default = LoLAPIClient;