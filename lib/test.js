'use strict';

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
            _logger2.default.info((yield lolAPIClientInstance.getLeagueEntryBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160, 43114094])));
            _logger2.default.info((yield lolAPIClientInstance.getLeaguesChallengerTier(REGION_TO_BE_TESTED, 'RANKED_SOLO_5x5')));
            _logger2.default.info((yield lolAPIClientInstance.getLeaguesMasterTier(REGION_TO_BE_TESTED, 'RANKED_SOLO_5x5')));

            // Static routes testing.
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllChampionData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticChampionDataByChampionId(REGION_TO_BE_TESTED, 1)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllItemData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticItemDataByItemId(REGION_TO_BE_TESTED, 1410)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllLanguageStringsData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllLanguagesData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllMapData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllMasteryData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticMasteryDataByMasterId(REGION_TO_BE_TESTED, 6121)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllRealmsData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllRunesData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticRuneDataByRuneId(REGION_TO_BE_TESTED, 5235)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllSummonerSpellsData(REGION_TO_BE_TESTED)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticSummonerSpellDataBySummonerId(REGION_TO_BE_TESTED, 1)));
            _logger2.default.info((yield lolAPIClientInstance.getStaticAllVersionsData(REGION_TO_BE_TESTED)));

            // Shard status routes.
            _logger2.default.info((yield lolAPIClientInstance.getStatusAllShardsData()));
            _logger2.default.info((yield lolAPIClientInstance.getStatusShardDataByRegion(REGION_TO_BE_TESTED)));

            // Match and matchlist routes.
            _logger2.default.info((yield lolAPIClientInstance.getMatchByMatchId(REGION_TO_BE_TESTED, 2180674644, true)));
            _logger2.default.info((yield lolAPIClientInstance.getMatchListBySummonerId(REGION_TO_BE_TESTED, 5908)));

            // Stats routes.
            _logger2.default.info((yield lolAPIClientInstance.getRankedStatsBySummonerId(REGION_TO_BE_TESTED, 5908)));
            _logger2.default.info((yield lolAPIClientInstance.getPlayerStatsSummariesBySummonerId(REGION_TO_BE_TESTED, 5908)));

            // Summoner routes.
            _logger2.default.info((yield lolAPIClientInstance.getSummonerObjectsDataBySummonerNames(REGION_TO_BE_TESTED, ['Dyrus', 'Udyr'])));
            _logger2.default.info((yield lolAPIClientInstance.getSummonerObjectsDataBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160])));
            _logger2.default.info((yield lolAPIClientInstance.getSummonerMasteryPagesBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160])));
            _logger2.default.info((yield lolAPIClientInstance.getSummonerNamesBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160])));
            _logger2.default.info((yield lolAPIClientInstance.getSummonerRunePagesBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160])));

            // Team's Leagues routes can't be tested as teams are in a 'disabled' state currently.
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
 * @param {String} REGION_TO_BE_TESTED The region.
 */
const lolAPIClientInstance = new _nodeLolApi2.default(RIOT_GAMES_PROD_API_KEY, REGION_TO_BE_TESTED);

testAsyncAwait();