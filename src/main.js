import LOGGER from './logger';
import querystring from 'querystring';
import requestPromise from 'request-promise';
import request from 'request';
import url from 'url';

class LoLAPIClient {
    constructor(apiKey, region = 'NA') {
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

    _makeAPIRequest(url) {
        console.log(url);
        let rpOptions = {
            uri: url,
            json: true,
        };
        let response;

        requestPromise(rpOptions)
            .then(body => {
                response = body;
            })
            .catch(err => {
                response = err;
            });

        console.log(response);

        return response;
    }

    _buildAPIRequestURL(route, region = this.region, options = {}) {
        let baseURLFormatted = `https://${region}.api.pvp.net/`;
        let routeFormatted = route.replace('{region}', region.toLowerCase());

        options.api_key = this.apiKey;

        let routeQuerystring = querystring.stringify(options);
        let finalURLFormatted = url.resolve(baseURLFormatted, routeFormatted) +
            '?' + routeQuerystring;
        return finalURLFormatted;
    }

    getChampions(region, freeToPlay) {
        let route = `/api/lol/{region}/v1.2/champion`;

        let finalURL = this._buildAPIRequestURL(route, region, {
            freeToPlay: freeToPlay,
        });

        return this._makeAPIRequest(finalURL);
    }

    getChampionById(region, championId = 1) {
        let route = `/api/lol/{region}/v1.2/champion/${championId ? championId : 1}`;
        let finalURL = this._buildAPIRequestURL(route, region);

        console.log(finalURL);
    }
}

let lol = new LoLAPIClient('abee5b6a-41b5-4be4-8d50-bd19cd4da6d5', 'NA');
LOGGER.info(lol.getChampions('TR'));
LOGGER.info(lol.getChampionById('kr'));
