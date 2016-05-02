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
    class LoLAPIClient {
        constructor(apiKey: string, region: string): void;

        _makeAPIRequest(url: string): Promise<T>;
        _buildAPIRequestURL(route: string, region?: string, options?: StringMap): string;
        _buildStaticAPIRequestURL(route: string, region?: string, options?: StringMap): string;
        _buildStatusAPIRequestURL(route: string, region?: string, options?: StringMap): string;

        getAllChampions(region?: string, freeToPlay?: boolean): LoLAPIResponse;
        getChampionByChampionId(region?: string, championId: number): LoLAPIResponse;

        getChampionMasteryBySummonerIdAndChampionId(region?: string, summonerId: number, championId: number): LoLAPIResponse;
        getAllChampionMasteryEntriesBySummonerId(region?: string, summonerId: number): LoLAPIResponse;
        getTotalChampionMasteryScoreBySummonerId(region?: string, summonerId: number): LoLAPIResponse;
        getTopChampionMasteryEntriesBySummonerId(region?: string, summonerId: number, count?: number): LoLAPIResponse;

        getCurrentGameBySummonerId(region?: string, summonerId: number): LoLAPIResponse;

        getFeaturedGames(region?: string): LoLAPIResponse;

        getRecentGamesBySummonerId(region?: string, summonerId: number): LoLAPIResponse;

        getLeaguesBySummonerIds(region?: string, summonerIds: number[]): LoLAPIResponse;
        getLeagueEntryBySummonerIds(region?: string, summonerIds: number[]): LoLAPIResponse;
        getLeaguesByTeamIds(region?: string, teamIds: string[]): LoLAPIResponse;
        getLeagueEntryByTeamIds(region?: string, teamIds: string[]): LoLAPIResponse;
        getLeaguesChallengerTier(region?: string, queueType: string = 'RANKED_SOLO_5x5'): LoLAPIResponse;
        getLeaguesMasterTier(region?: string, queueType: string = 'RANKED_SOLO_5x5'): LoLAPIResponse;

        // Static API routes -- START --
        getStaticAllChampionData(region?: string, locale?: string, version?: string, dataById?: boolean, champData?: string[]): LoLAPIResponse;
        getStaticChampionDataByChampionId(region?: string, championId: number, locale?: string, version?: string, champData?: string[]): LoLAPIResponse;

        getStaticAllItemData(region?: string, locale?: string, version?: string, itemListData?: string[]): LoLAPIResponse;
        getStaticItemDataByItemId(region?: string, itemId, locale?: string, version?: string, itemData?: string[]): LoLAPIResponse;

        getStaticAllLanguageStringsData(region?: string, locale?: string, version?: string): LoLAPIResponse;
        getStaticAllLanguagesData(region?: string): lolapires;

        getStaticAllMapData(region?: string, locale?: string, version?: string): LoLAPIResponse;

        getStaticAllMasteryData(region?: string, locale?: string, version?: string, masteryListData?: string[]): LoLAPIResponse;
        getStaticMasteryDataByMasterId(region?: string, masteryId, locale?: string, version?: string, masteryData?: string[]): LoLAPIResponse;

        getStaticAllRealmsData(region?: string): LoLAPIResponse;

        getStaticAllRunesData(region?: string, locale?: string, version?: string, runeListData?: string[]): LoLAPIResponse;
        getStaticRuneDataByRuneId(region?: string, runeId, locale?: string, version?: string, runeData?: string[]): LoLAPIResponse;

        getStaticAllSummonerSpellsData(region?: string, locale?: string, version?: string, dataById, spellData?: string[]): LoLAPIResponse;
        getStaticSummonerSpellDataBySummonerId(region?: string, summonerSpellId: number, locale?: string, version?: string, spellData?: string[]): LoLAPIResponse;

        getStaticAllVersionsData(region?: string): LoLAPIResponse;
        // Static API routes -- END --

        getStatusAllShardsData(): LoLAPIResponse;
        getStatusShardDataByRegion(region?: string): LoLAPIResponse;

        getMatchByMatchId(region?: string, matchId: number, includeTimeline?: boolean): LoLAPIResponse;

        getMatchListBySummonerId(region?: string, summonerId: number, championIds?: number[], rankedQueues?: string[], seasons?: string[], beginTime?: number, endTime?: number, beginIndex?: number, endIndex?: number): LoLAPIResponse;

        getRankedStatsBySummonerId(region?: string, summonerId: number, season?: string): LoLAPIResponse;
        getPlayerStatsSummariesBySummonerId(region?: string, summonerId: number, season?: string): LoLAPIResponse;

        getSummonerObjectsDataBySummonerNames(region?: string, summonerNames: string[]): LoLAPIResponse;
        getSummonerObjectsDataBySummonerIds(region?: string, summonerIds: number[]): LoLAPIResponse;
        getSummonerMasteryPagesBySummonerIds(region?: string, summonerIds: number[]): LoLAPIResponse;
        getSummonerNamesBySummonerIds(region?: string, summonerIds: number[]): LoLAPIResponse;
        getSummonerRunePagesBySummonerIds(region?: string, summonerIds: number[]): LoLAPIResponse;

        getTeamsBySummonerIds(region?: string, summonerIds: number[]): LoLAPIResponse;
        getTeamsByTeamIds(region?: string, teamIds: string[]): LoLAPIResponse;
    }
}
