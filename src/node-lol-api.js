import LOGGER from './logger';
import querystring from 'querystring';
import requestPromise from 'request-promise';
import request from 'request';
import url from 'url';
import util from 'util';

export default class LoLAPIClient {
    constructor(apiKey, region = 'NA') {
        this.apiKey = apiKey;
        this.region = region;
        this.REGIONAL_ENDPOINT_HOST_TEMPLATE = `https://{region}.api.pvp.net/`;
        this.STATIC_ENDPOINT_TEMPLATE = `https://global.api.pvp.net/`;
        this.REGIONAL_ENDPOINTS = {
            BR: {
                platformId: 'BR1',
                name: 'Brazil',
            },
            EUNE: {
                platformId: 'EUN1',
                name: 'Europe Nordic & East',
            },
            EUW: {
                platformId: 'EUW1',
                name: 'Europe West',
            },
            JP: {
                platformId: 'JP1',
                name: 'Japan',
            },
            KR: {
                platformId: 'KR',
                name: 'Korea',
            },
            LAN: {
                platformId: 'LA1',
                name: 'Latin America North',
            },
            LAS: {
                platformId: 'LA2',
                name: 'Latin America South',
            },
            NA: {
                platformId: 'NA1',
                name: 'North America',
            },
            OCE: {
                platformId: 'OC1',
                name: 'Oceania',
            },
            TR: {
                platformId: 'TR1',
                name: 'Turkey',
            },
            RU: {
                platformId: 'RU',
                name: 'Russia',
            },
            PBE: {
                platformId: 'PBE1',
                name: 'Public Beta Environment',
            },
        };
    }

    _makeAPIRequest(url) {
        let requestPromiseOptions = {
            uri: url,
            json: true,
        };

        let apiRequestPromise = requestPromise(requestPromiseOptions);
        return apiRequestPromise;
    }

    _buildAPIRequestURL(route, region = this.region, options = {}) {
        let baseURLFormatted = `https://${region}.api.pvp.net/`;
        let routeFormatted = route.replace('{region}', region.toLowerCase());

        options.api_key = this.apiKey;

        let routeQuerystring = querystring.stringify(options);
        let finalURLFormatted = url.resolve(baseURLFormatted, routeFormatted) +
            '?' + routeQuerystring;

        LOGGER.debug(`fn: ${this._buildAPIRequestURL.name}(
            route: ${route},
            region: ${region},
            options: ${util.inspect(options)}): URL=${finalURLFormatted}`);

        return finalURLFormatted;
    }

    _buildStaticAPIRequestURL(route, region = this.region, options = {}) {
        let baseURLFormatted = `https://global.api.pvp.net/`;
        let routeFormatted = route.replace('{region}', region.toLowerCase());

        options.api_key = this.apiKey;

        let routeQuerystring = querystring.stringify(options);
        let finalURLFormatted = url.resolve(baseURLFormatted, routeFormatted) +
            '?' + routeQuerystring;

        LOGGER.debug(`fn: ${this._buildStaticAPIRequestURL.name}(
            route: ${route},
            region: ${region},
            options: ${util.inspect(options)}): URL=${finalURLFormatted}`);

        return finalURLFormatted;
    }

    _buildStatusAPIRequestURL(route, region = this.region, options = {}) {
        let baseURLFormatted = `https://status.leagueoflegends.com/`;
        let routeFormatted = route.replace('{region}', region.toLowerCase());

        options.api_key = this.apiKey;

        let routeQuerystring = querystring.stringify(options);
        let finalURLFormatted = url.resolve(baseURLFormatted, routeFormatted) +
            '?' + routeQuerystring;

        LOGGER.debug(`fn: ${this._buildStatusAPIRequestURL.name}(
            route: ${route},
            region: ${region},
            options: ${util.inspect(options)}): URL=${finalURLFormatted}`);

        return finalURLFormatted;
    }

    getAllChampions(region, freeToPlay) {
        let route = `/api/lol/${region.toLowerCase()}/v1.2/champion`;

        let finalURL = this._buildAPIRequestURL(route, region, {
            freeToPlay: freeToPlay,
        });

        return this._makeAPIRequest(finalURL);
    }

    getChampionByChampionId(region, championId) {
        let route = `/api/lol/${region.toLowerCase()}/v1.2/champion/${championId ? championId : 1}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getChampionMasteryBySummonerIdAndChampionId(region, summonerId, championId) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route =
            `/championmastery/location/${platformId}/player/${summonerId}/champion/${championId}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getAllChampionMasteryEntriesBySummonerId(region, summonerId) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route =
            `/championmastery/location/${platformId}/player/${summonerId}/champions`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getTotalChampionMasteryScoreBySummonerId(region, summonerId) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route =
            `/championmastery/location/${platformId}/player/${summonerId}/score`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getTopChampionMasteryEntriesBySummonerId(region, summonerId, count) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route =
            `/championmastery/location/${platformId}/player/${summonerId}/topchampions`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            count: count,
        });

        return this._makeAPIRequest(finalURL);
    }

    getCurrentGameBySummonerId(region, summonerId) {
        let platformId = this.REGIONAL_ENDPOINTS[region.toUpperCase()].platformId;
        let route =
            `/observer-mode/rest/consumer/getSpectatorGameInfo/${platformId}/${summonerId}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getFeaturedGames(region) {
        let route = `/observer-mode/rest/featured`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getRecentGamesBySummonerId(region, summonerId) {
        let route = `/api/lol/${region.toLowerCase()}/v1.3/game/by-summoner/${summonerId}/recent`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeaguesBySummonerIds(region, summonerIds = []) {
        let route = `/api/lol/${region.toLowerCase()}/v2.5/league/by-summoner/${summonerIds}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeagueEntryBySummonerIds(region, summonerIds = []) {
        let route = `/api/lol/${region.toLowerCase()}/v2.5/league/by-summoner/${summonerIds}/entry`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeaguesByTeamIds(region, teamIds = []) {
        let route = `/api/lol/${region.toLowerCase()}/v2.5/league/by-team/${teamIds}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeagueEntryByTeamIds(region, teamIds = []) {
        let route = `/api/lol/${region.toLowerCase()}/v2.5/league/by-team/${teamIds}/entry`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getLeaguesChallengerTier(region, queueType = 'RANKED_SOLO_5x5') {
        let route = `/api/lol/${region.toLowerCase()}/v2.5/league/challenger`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            type: queueType,
        });

        return this._makeAPIRequest(finalURL);
    }

    getLeaguesMasterTier(region, queueType = 'RANKED_SOLO_5x5') {
        let route = `/api/lol/${region.toLowerCase()}/v2.5/league/master`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            type: queueType,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllChampionData(region, locale, version, dataById, champData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/champion`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            dataById: dataById,
            champData: champData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticChampionDataByChampionId(region, championId, locale, version, champData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/champion/${championId}`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            champData: champData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllItemData(region, locale, version, itemListData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/item`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            itemListData: itemListData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticItemDataByItemId(region, itemId, locale, version, itemData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/item`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            itemData: itemData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllLanguageStringsData(region, locale, version) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/language-strings`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllLanguagesData(region) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/languages`;
        let finalURL = this._buildStaticAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllMapData(region, locale, version) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/map`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllMasteryData(region, locale, version, masteryListData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/mastery`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            masteryListData: masteryListData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticMasteryDataByMasterId(region, masteryId, locale, version, masteryData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/mastery/${masteryId}`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            masteryData: masteryData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllRealmsData(region) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/realm`;
        let finalURL = this._buildStaticAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllRunesData(region, locale, version, runeListData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/rune`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            runeListData: runeListData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticRuneDataByRuneId(region, runeId, locale, version, runeData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/rune/${runeId}`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            runeData: runeData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllSummonerSpellsData(region, locale, version, dataById, spellData) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/summoner-spell`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            dataById: dataById,
            spellData: spellData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticSummonerSpellDataBySummonerId(region, summonerSpellId, locale, version, spellData) {
        let route =
            `/api/lol/static-data/${region.toLowerCase()}/v1.2/summoner-spell/${summonerSpellId}`;
        let finalURL = this._buildStaticAPIRequestURL(route, region, {
            locale: locale,
            version: version,
            spellData: spellData,
        });

        return this._makeAPIRequest(finalURL);
    }

    getStaticAllVersionsData(region) {
        let route = `/api/lol/static-data/${region.toLowerCase()}/v1.2/versions`;
        let finalURL = this._buildStaticAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getStatusAllShardsData() {
        let route = `/shards`;
        let finalURL = this._buildStatusAPIRequestURL(route);

        return this._makeAPIRequest(finalURL);
    }

    getStatusShardDataByRegion(region) {
        let route = `/shards/${region.toLowerCase()}`;
        let finalURL = this._buildStatusAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getMatchByMatchId(region, matchId, includeTimeline) {
        let route = `/api/lol/${region.toLowerCase()}/v2.2/match/${matchId}`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            includeTimeline: includeTimeline,
        });

        return this._makeAPIRequest(finalURL);
    }

    getMatchListBySummonerId(
        region,
        summonerId,
        championIds = [],
        rankedQueues = [],
        seasons = [],
        beginTime,
        endTime,
        beginIndex,
        endIndex
    ) {
        let route = `/api/lol/${region.toLowerCase()}/v2.2/matchlist/by-summoner/${summonerId}`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            championIds: championIds,
            rankedQueues: rankedQueues,
            seasons: seasons,
            beginTime: beginTime,
            endTime: endTime,
            beginIndex: beginIndex,
            endIndex: endIndex,
        });

        return this._makeAPIRequest(finalURL);
    }

    getRankedStatsBySummonerId(region, summonerId, season) {
        let route = `/api/lol/${region.toLowerCase()}/v1.3/stats/by-summoner/${summonerId}/ranked`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            season: season,
        });

        return this._makeAPIRequest(finalURL);
    }

    getPlayerStatsSummariesBySummonerId(region, summonerId, season) {
        let route = `/api/lol/${region.toLowerCase()}/v1.3/stats/by-summoner/${summonerId}/summary`;
        let finalURL = this._buildAPIRequestURL(route, region, {
            season: season,
        });

        return this._makeAPIRequest(finalURL);
    }

    getSummonerObjectsDataBySummonerNames(region, summonerNames=[]) {
        let route = `/api/lol/${region.toLowerCase()}/v1.4/summoner/by-name/${summonerNames}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getSummonerObjectsDataBySummonerIds(region, summonerIds=[]) {
        let route = `/api/lol/${region.toLowerCase()}/v1.4/summoner/${summonerIds}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getSummonerMasteryPagesBySummonerIds(region, summonerIds=[]) {
        let route = `/api/lol/${region.toLowerCase()}/v1.4/summoner/${summonerIds}/masteries`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getSummonerNamesBySummonerIds(region, summonerIds=[]) {
        let route = `/api/lol/${region.toLowerCase()}/v1.4/summoner/${summonerIds}/name`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getSummonerRunePagesBySummonerIds(region, summonerIds=[]) {
        let route = `/api/lol/${region.toLowerCase()}/v1.4/summoner/${summonerIds}/runes`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getTeamsBySummonerIds(region, summonerIds=[]) {
        let route = `/api/lol/${region.toLowerCase()}/v2.4/team/by-summoner/${summonerIds}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }

    getTeamsByTeamIds(region, teamIds=[]) {
        let route = `/api/lol/${region.toLowerCase()}/v2.4/team/${teamIds}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        return this._makeAPIRequest(finalURL);
    }
}
