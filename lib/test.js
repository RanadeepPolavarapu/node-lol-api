'use strict';

//
// lol.getChampionMasteryBySummonerIdAndChampionId('na', 5908, 1)
//     .then(response => console.log(response))
//     .catch(err => LOGGER.error(err));
//
// lol.getLeaguesBySummonerIds('na', [5908, 2, 8])
//     .then(response => console.log(response))
//     .catch(err => LOGGER.error(err));

let main = (() => {
    var ref = _asyncToGenerator(function* () {
        try {
            var resp = yield lol.getTeamsBySummonerIds('NA', [5908, 49159160]);
            console.log(resp);
        } catch (err) {
            console.error(err);
        }
    });

    return function main() {
        return ref.apply(this, arguments);
    };
})();

require('babel-polyfill');

var _nodeLolApi = require('./node-lol-api');

var _nodeLolApi2 = _interopRequireDefault(_nodeLolApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const RIOT_GAMES_PROD_API_KEY = process.env.RIOT_GAMES_PROD_API_KEY || 'abee5b6a-41b5-4be4-8d50-bd19cd4da6d5';

let lol = new _nodeLolApi2.default(RIOT_GAMES_PROD_API_KEY, 'NA');

lol.getAllChampions('TR', true).then(response => console.log(response));

lol.getChampionByChampionId('TR', 2).then(response => console.log(response)).catch(err => LOGGER.error(err));

main();

// LOGGER.info(lol.getChampionById('kr'));