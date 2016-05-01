import LOGGER from './logger';
import LoLAPIClient from './node-lol-api';
import util from 'util';

const RIOT_GAMES_PROD_API_KEY = process.env.RIOT_GAMES_PROD_API_KEY ||
    'abee5b6a-41b5-4be4-8d50-bd19cd4da6d5';

const REGION_TO_BE_TESTED = 'NA';

/**
 * An instance of the LoLAPIClient.
 * @param {String} RIOT_GAMES_PROD_API_KEY A production key fetched from an environment variable.
 * @param {String} 'NA'                    The region.
 */
let lolAPIClientInstance = new LoLAPIClient(RIOT_GAMES_PROD_API_KEY, 'NA');

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

        // LOGGER.info(await lolAPIClientInstance.getTeamsBySummonerIds(REGION_TO_BE_TESTED, [5908, 49159160]));
    } catch (err) {
        LOGGER.error(err);
    }
}

testAsyncAwait();
