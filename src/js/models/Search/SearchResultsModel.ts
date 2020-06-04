import {mapSearchResult, SearchResultModel} from './ResultItems/SearchResultModel';
import {mapSearchFacetsGroup, SearchFacetsGroupModel} from './SearchFacetsGroupModel';

export interface SearchResultsModel {
    results: SearchResultModel[];
    searchFacets: SearchFacetsGroupModel[];
    hitCount: number;
}

export function mapSearchResults(data): SearchResultsModel{
    return {
        results: data.results.map((item) => mapSearchResult(item)),
        searchFacets: data.searchFacets.map((facet) => mapSearchFacetsGroup(facet)),
        hitCount: data.hitCount
    } as SearchResultsModel;
}
