import LOGGER from './logger';
import requestPromise from 'request-promise';
import url from 'url';
import querystring from 'querystring';

class LoLAPIClient {
    constructor(apiKey, region) {
        this.apiKey = apiKey;
        this.region = region;
        this.REGIONAL_ENDPOINT_HOST_TEMPLATE = `https://{region}.api.pvp.net/`;
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

    async _makeAPIRequest() {
        await requestPromise(`https://${this.region}.api.pvp.net/`);
    }

    // _buildAPIRequestURL(route, region, options) {
    //
    // }

    getChampions(region, freeToPlay) {
        let hostBaseUrl = region ? `https://${region}.api.pvp.net/` :
            `https://${this.region}.api.pvp.net/`;
        let route = region ? '/api/lol/{region}/v1.2/champion'.replace('{region}', region) :
            '/api/lol/{region}/v1.2/champion'.replace('{region}', this.region);
        let routeQuerystring = querystring.stringify({
            freeToPlay: freeToPlay,
            api_key: this.apiKey,
        });
        let finalURL = url.resolve(hostBaseUrl, route) + '?' + routeQuerystring;
        return finalURL;
    }
}

let lol = new LoLAPIClient('abee5b6a-41b5-4be4-8d50-bd19cd4da6d5', 'NA');
LOGGER.info(lol.getChampions());
