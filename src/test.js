import LoLAPIClient from './node-lol-api';

const RIOT_GAMES_PROD_API_KEY = process.env.RIOT_GAMES_PROD_API_KEY ||
    'abee5b6a-41b5-4be4-8d50-bd19cd4da6d5';

let lol = new LoLAPIClient(RIOT_GAMES_PROD_API_KEY, 'NA');

lol.getAllChampions('TR', true).then(response => console.log(response));

lol.getChampionByChampionId('TR', 2)
    .then(response => console.log(response))
    .catch(err => LOGGER.error(err));

//
// lol.getChampionMasteryBySummonerIdAndChampionId('na', 5908, 1)
//     .then(response => console.log(response))
//     .catch(err => LOGGER.error(err));
//
// lol.getLeaguesBySummonerIds('na', [5908, 2, 8])
//     .then(response => console.log(response))
//     .catch(err => LOGGER.error(err));

async function main() {
    try {
        var resp = await lol.getTeamsBySummonerIds('NA', [5908, 36531216]);
        console.log(resp);
    } catch (err) {
        console.error(err);
    }
}

main();

// LOGGER.info(lol.getChampionById('kr'));
