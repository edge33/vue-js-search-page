export interface SearchQueryInputModel {
    searchQuery: string;
    startDate: string;
    endDate: string;
    facets: FacetInputModel[];
    pageStart: number;
    count: number;
    sorting: Array<string>;
}

export interface FacetInputModel {
    type: string;
    id: string;
}

export function getSearchQueryInputModel(): SearchQueryInputModel {
    return {
        searchQuery: '',
        startDate: '',
        endDate: '',
        facets: [],
        pageStart: 0,
        count: 10,
        sorting: []
    } as SearchQueryInputModel;
}
