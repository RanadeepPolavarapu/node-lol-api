'use strict';

//
// lol.getChampionMasteryBySummonerIdAndChampionId('na', 5908, 1)
//     .then(response => console.log(response))
//     .catch(err => LOGGER.error(err));
//
// lol.getLeaguesBySummonerIds('na', [5908, 2, 8])
//     .then(response => console.log(response))
//     .catch(err => LOGGER.error(err));

var main = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return lol.getTeamsBySummonerIds('NA', [5908, 36531216]);

                    case 3:
                        resp = _context.sent;

                        console.log(resp);
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        console.error(_context.t0);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 7]]);
    }));

    return function main() {
        return ref.apply(this, arguments);
    };
}();

var _nodeLolApi = require('./node-lol-api');

var _nodeLolApi2 = _interopRequireDefault(_nodeLolApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var lol = new _nodeLolApi2.default('abee5b6a-41b5-4be4-8d50-bd19cd4da6d5', 'NA');

lol.getAllChampions('TR', true).then(function (response) {
    return console.log(response);
});

lol.getChampionByChampionId('TR', 2).then(function (response) {
    return console.log(response);
}).catch(function (err) {
    return LOGGER.error(err);
});

main();

// LOGGER.info(lol.getChampionById('kr'));