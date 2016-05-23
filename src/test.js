import LOGGER from './logger';
import LoLAPIClient from './node-lol-api';
import util from 'util';

const RIOT_GAMES_PROD_API_KEY = process.env.RIOT_GAMES_PROD_API_KEY ||
    'abee5b6a-41b5-4be4-8d50-bd19cd4da6d5';

const REGION_TO_BE_TESTED = 'NA';

/**
 * An instance of the LoLAPIClient.
 * @param {String} RIOT_GAMES_PROD_API_KEY A production key fetched from an environment variable.
 * @param {String} REGION_TO_BE_TESTED The region.
 */
let lolAPIClientInstance = new LoLAPIClient(RIOT_GAMES_PROD_API_KEY, REGION_TO_BE_TESTED);

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

async function testAsyncAwait() {
    try {
        LOGGER.info(await lolAPIClientInstance.getAllChampions(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getAllChampions(REGION_TO_BE_TESTED, true));
        LOGGER.info(await lolAPIClientInstance.getChampionByChampionId(REGION_TO_BE_TESTED, 1));

        LOGGER.info(await lolAPIClientInstance.getChampionMasteryBySummonerIdAndChampionId(REGION_TO_BE_TESTED, 5908, 68));
        LOGGER.info(await lolAPIClientInstance.getAllChampionMasteryEntriesBySummonerId(REGION_TO_BE_TESTED, 5908));
        LOGGER.info(await lolAPIClientInstance.getTotalChampionMasteryScoreBySummonerId(REGION_TO_BE_TESTED, 5908));
        LOGGER.info(await lolAPIClientInstance.getTopChampionMasteryEntriesBySummonerId(REGION_TO_BE_TESTED, 5908));
        LOGGER.info(await lolAPIClientInstance.getTopChampionMasteryEntriesBySummonerId(REGION_TO_BE_TESTED, 5908, 5));

        // Can't test in game because it depends on if player is in a live game.
        // LOGGER.info(await lolAPIClientInstance.getCurrentGameBySummonerId(REGION_TO_BE_TESTED, 5908));

        LOGGER.info(await lolAPIClientInstance.getFeaturedGames(REGION_TO_BE_TESTED));

        LOGGER.info(await lolAPIClientInstance.getRecentGamesBySummonerId(REGION_TO_BE_TESTED, 5908));

        LOGGER.info(await lolAPIClientInstance.getLeaguesBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160, 43114094]));
        LOGGER.info(await lolAPIClientInstance.getLeagueEntryBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160, 43114094]));
        LOGGER.info(await lolAPIClientInstance.getLeaguesChallengerTier(REGION_TO_BE_TESTED, 'RANKED_SOLO_5x5'));
        LOGGER.info(await lolAPIClientInstance.getLeaguesMasterTier(REGION_TO_BE_TESTED, 'RANKED_SOLO_5x5'));

        // Static routes testing.
        LOGGER.info(await lolAPIClientInstance.getStaticAllChampionData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticChampionDataByChampionId(REGION_TO_BE_TESTED, 1));
        LOGGER.info(await lolAPIClientInstance.getStaticAllItemData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticItemDataByItemId(REGION_TO_BE_TESTED, 1410));
        LOGGER.info(await lolAPIClientInstance.getStaticAllLanguageStringsData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticAllLanguagesData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticAllMapData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticAllMasteryData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticMasteryDataByMasterId(REGION_TO_BE_TESTED, 6121));
        LOGGER.info(await lolAPIClientInstance.getStaticAllRealmsData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticAllRunesData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticRuneDataByRuneId(REGION_TO_BE_TESTED, 5235));
        LOGGER.info(await lolAPIClientInstance.getStaticAllSummonerSpellsData(REGION_TO_BE_TESTED));
        LOGGER.info(await lolAPIClientInstance.getStaticSummonerSpellDataBySummonerId(REGION_TO_BE_TESTED, 1));
        LOGGER.info(await lolAPIClientInstance.getStaticAllVersionsData(REGION_TO_BE_TESTED));

        // Shard status routes.
        LOGGER.info(await lolAPIClientInstance.getStatusAllShardsData());
        LOGGER.info(await lolAPIClientInstance.getStatusShardDataByRegion(REGION_TO_BE_TESTED));

        // Match and matchlist routes.
        LOGGER.info(await lolAPIClientInstance.getMatchByMatchId(REGION_TO_BE_TESTED, 2180674644, true));
        LOGGER.info(await lolAPIClientInstance.getMatchListBySummonerId(REGION_TO_BE_TESTED, 5908));

        // Stats routes.
        LOGGER.info(await lolAPIClientInstance.getRankedStatsBySummonerId(REGION_TO_BE_TESTED, 5908));
        LOGGER.info(await lolAPIClientInstance.getPlayerStatsSummariesBySummonerId(REGION_TO_BE_TESTED, 5908));

        // Summoner routes.
        LOGGER.info(await lolAPIClientInstance.getSummonerObjectsDataBySummonerNames(REGION_TO_BE_TESTED, ['Dyrus', 'Udyr']));
        LOGGER.info(await lolAPIClientInstance.getSummonerObjectsDataBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160]));
        LOGGER.info(await lolAPIClientInstance.getSummonerMasteryPagesBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160]));
        LOGGER.info(await lolAPIClientInstance.getSummonerNamesBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160]));
        LOGGER.info(await lolAPIClientInstance.getSummonerRunePagesBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160]));

        // Team's Leagues routes can't be tested as teams are in a 'disabled' state currently.
    } catch (err) {
        LOGGER.error(err);
    }
}

testAsyncAwait();
