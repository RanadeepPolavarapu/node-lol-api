// Type definitions for node-lol-api
// Project: https://github.com/RanadeepPolavarapu/node-lol-api
// Definitions by: Ranadeep Polavarapu <https://github.com/RanadeepPolavarapu/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/es6-promise/es6-promise.d.ts
/// <reference path="../es6-promise/es6-promise.d.ts" />

interface StringMap {
    [s: string]: string;
}

interface LoLAPIResponse {
    Promise<T>;
}

declare module 'node-lol-api' {
    interface Foo { }
    interface Bar { }
    interface Buzz { }

    class LoLAPIClient {
        constructor(apiKey: string, region:string): void;

        _makeAPIRequest(url: string): Promise<T>;
        _buildAPIRequestURL(route: string, region?:string, options?:StringMap): string;
        _buildStaticAPIRequestURL(route: string, region?:string, options?:StringMap): string;
        _buildStatusAPIRequestURL(route: string, region?:string, options?:StringMap): string;

        getAllChampions(region?:string, freeToPlay?:boolean): LoLAPIResponse;
        getChampionByChampionId(region?:string, championId:number): LoLAPIResponse;
    }
}
