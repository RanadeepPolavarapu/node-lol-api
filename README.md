# node-lol-api

[![Build Status](https://travis-ci.org/RanadeepPolavarapu/node-lol-api.svg?branch=master)](https://travis-ci.org/RanadeepPolavarapu/node-lol-api)  

A Node.js League of Legends API client that uses [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)s from ES6\. This solves the callback hell problem of having highly nested callbacks that are found in applications using callback oriented API clients.

## Installation

This module is installed via npm:

``` bash
npm install TBAPublishedName
```

This library depends on [request-promise](https://www.npmjs.com/package/request-promise) for performing HTTP Promisified requests and [winston](https://www.npmjs.com/package/winston) for logging.  

## Documentation

### Create an API instance

``` js
const LOL_API_CLIENT = new LoLAPIClient('98fa936c-75af-459c-8fc1-cded8fb0050b', 'NA'); // Example API key.
```

### Usage

``` js
LOL_API_CLIENT.getChampionByChampionId('EUW', 2);
```

Each API function returns a `Promise`, so it can be used using the `.then` and `.catch` style or using ES7's [async/await](https://ponyfoo.com/articles/understanding-javascript-async-await).

#### Using [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) and [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
``` js
LOL_API_CLIENT.getChampionByChampionId('TR', 2)
    .then(response => console.log(response))
    .catch(err => console.error(err));
```

#### Using ES7 `async` and `await`

The usage of `async` and `await` makes your application code much cleaner.

``` js
async function main() {
    try {
        let response = await LOL_API_CLIENT.getChampionByChampionId('TR', 3);
        console.log(response);

        // Do whatever. For example, insert this response data into some database.

    } catch (err) {
        console.error(err);
    }
}

main();
```

## License

The MIT License (MIT)

Copyright (c) 2016 RanadeepPolavarapu [RanadeepPolavarapu@users.noreply.github.com](RanadeepPolavarapu@users.noreply.github.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
