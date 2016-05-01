'use strict';

// lolAPIClientInstance.getAllChampions('TR', true).then(response => console.log(response));
//
// lolAPIClientInstance.getChampionByChampionId('TR', 2)
//     .then(response => LOGGER.info(response))
//     .catch(err => LOGGER.error(err));

//
// lol.getChampionMasteryBySummonerIdAndChampionId('na', 5908, 1)
//     .then(response => console.log(response))
//     .catch(err => LOGGER.error(err));
//
// lol.getLeaguesBySummonerIds('na', [5908, 2, 8])
//     .then(response => console.log(response))
//     .catch(err => LOGGER.error(err));

let testAsyncAwait = (() => {
    var ref = _asyncToGenerator(function* () {
        try {
            _logger2.default.info((yield lolAPIClientInstance.getAllChampions(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getAllChampions(REGION_TO_BE_TESTED, true)));
            _logger2.default.info((yield lolAPIClientInstance.getChampionByChampionId(REGION_TO_BE_TESTED, 1)));

            _logger2.default.info((yield lolAPIClientInstance.getChampionMasteryBySummonerIdAndChampionId(REGION_TO_BE_TESTED, 5908, 68)));
            _logger2.default.info((yield lolAPIClientInstance.getAllChampionMasteryEntriesBySummonerId(REGION_TO_BE_TESTED, 5908)));
            _logger2.default.info((yield lolAPIClientInstance.getTotalChampionMasteryScoreBySummonerId(REGION_TO_BE_TESTED, 5908)));
            _logger2.default.info((yield lolAPIClientInstance.getTopChampionMasteryEntriesBySummonerId(REGION_TO_BE_TESTED, 5908)));
            _logger2.default.info((yield lolAPIClientInstance.getTopChampionMasteryEntriesBySummonerId(REGION_TO_BE_TESTED, 5908, 5)));

            // Can't test in game because it depends on if player is in a live game.
            // LOGGER.info(await lolAPIClientInstance.getCurrentGameBySummonerId(REGION_TO_BE_TESTED, 5908));

            _logger2.default.info((yield lolAPIClientInstance.getFeaturedGames(REGION_TO_BE_TESTED)));

            _logger2.default.info((yield lolAPIClientInstance.getRecentGamesBySummonerId(REGION_TO_BE_TESTED, 5908)));

            _logger2.default.info((yield lolAPIClientInstance.getLeaguesBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160, 43114094])));

            // LOGGER.info(await lolAPIClientInstance.getTeamsBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160]));
        } catch (err) {
            _logger2.default.error(err);
        }
    });

    return function testAsyncAwait() {
        return ref.apply(this, arguments);
    };
})();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _nodeLolApi = require('./node-lol-api');

var _nodeLolApi2 = _interopRequireDefault(_nodeLolApi);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const RIOT_GAMES_PROD_API_KEY = process.env.RIOT_GAMES_PROD_API_KEY || 'abee5b6a-41b5-4be4-8d50-bd19cd4da6d5';

const REGION_TO_BE_TESTED = 'NA';

/**
 * An instance of the LoLAPIClient.
 * @param {String} RIOT_GAMES_PROD_API_KEY A production key fetched from an environment variable.
 * @param {String} 'NA'                    The region.
 */
let lolAPIClientInstance = new _nodeLolApi2.default(RIOT_GAMES_PROD_API_KEY, 'NA');

testAsyncAwait();