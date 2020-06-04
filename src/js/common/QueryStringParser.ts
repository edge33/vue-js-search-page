import {FacetInputModel, getSearchQueryInputModel, SearchQueryInputModel} from './SearchQueryInputModel';

const separator: string = encodeURI('%');


function getFacetsArray(searchQueryInputModel: SearchQueryInputModel, idsArray: Array<string>, type: string): FacetInputModel[] {
    const items = idsArray.map((id: string) => {return { id: id, type: type} as FacetInputModel});
    return searchQueryInputModel.facets.concat(items);
}


export function getUrlParams(search: string): SearchQueryInputModel {
    const hashes: string[] = search.slice(search.indexOf('?') + 1).split('&')
    const searchQueryInputModel: SearchQueryInputModel = getSearchQueryInputModel();
    hashes.forEach((hash: string) => {
        const [key, val] = hash.split('=')
        const idsArray = (val && val.length > 0 ) ? val.split(separator) : [];
        switch (key) {
            case 'q':
                searchQueryInputModel.searchQuery = decodeURIComponent(val);
                break;
            case 't':
                searchQueryInputModel.facets = getFacetsArray(searchQueryInputModel, idsArray, 'types');
                break;
            case 'a':
                searchQueryInputModel.facets = getFacetsArray(searchQueryInputModel, idsArray, 'Auteurs');
                break;
            case 'r':
                searchQueryInputModel.facets = getFacetsArray(searchQueryInputModel, idsArray, 'headings');
                break;
            case 'i':
                searchQueryInputModel.facets = getFacetsArray(searchQueryInputModel, idsArray, 'cases');
                break;
            case 'tag':
                searchQueryInputModel.facets = getFacetsArray(searchQueryInputModel, idsArray, 'tag');
                break;
            case 'v':
                searchQueryInputModel.facets = getFacetsArray(searchQueryInputModel, idsArray, 'Verzameling');
                break;
            case 'startdate':
                searchQueryInputModel.startDate = decodeURIComponent(val);
                break;
            case 'enddate':
                searchQueryInputModel.endDate = decodeURIComponent(val);
                break;
            case 'pageStart':
                searchQueryInputModel.pageStart = parseInt(val);
                break;
            case 'count':
                searchQueryInputModel.count = parseInt(val);
                break;
            case 'sorting':
                searchQueryInputModel.sorting = [val];
                break;
        }
    });
    return searchQueryInputModel;
}

function stringToQueryString(date: string, parameter: string): string {
    if (date && date.length > 0)
        return `&${parameter}=${encodeURIComponent(date)}`;
    return '';
}


function arrayToQueryString(theArray: string[], queryParam: string): string {
    if (theArray && theArray.length > 0)
        return `&${queryParam}=${theArray.join(separator)}`;
    return '';

}

export function toQueryString(model: SearchQueryInputModel): string {
    let queryString = '';
    const searchString = model.searchQuery;
    if (searchString && searchString.length > 0)
        queryString += `q=${encodeURIComponent(searchString)}`;

    model.facets.filter((facet: FacetInputModel) => facet.type === 'types');
    queryString += arrayToQueryString(model.facets
        .filter((facet: FacetInputModel) => facet.type === 'types')
        .map((facet: FacetInputModel) => facet.id), 't');
    queryString += arrayToQueryString(model.facets
        .filter((facet: FacetInputModel) => facet.type === 'cases')
        .map((facet: FacetInputModel) => facet.id), 'i');
    queryString += arrayToQueryString(model.facets
        .filter((facet: FacetInputModel) => facet.type === 'headings')
        .map((facet: FacetInputModel) => facet.id), 'r');
    queryString += arrayToQueryString(model.facets
        .filter((facet: FacetInputModel) => facet.type === 'Auteurs')
        .map((facet: FacetInputModel) => facet.id), 'a');
    queryString += arrayToQueryString(model.facets
        .filter((facet: FacetInputModel) => facet.type === 'Tags')
        .map((facet: FacetInputModel) => facet.id), 'tag');
    queryString += arrayToQueryString(model.facets
        .filter((facet: FacetInputModel) => facet.type === 'Verzameling')
        .map((facet: FacetInputModel) => facet.id), 'v');

    queryString += stringToQueryString(model.startDate, 'startdate');
    queryString += stringToQueryString(model.endDate, 'enddate');

    if (model.pageStart > 0) {
        queryString += stringToQueryString(model.pageStart.toString(), 'pageStart');
    }
    if (model.count > 0) {
        queryString += stringToQueryString(model.count.toString(), 'count');
    }
    const sorting = model.sorting.length > 0 ? model.sorting[0] : '';
    if (sorting.length > 0) {
        queryString += stringToQueryString(sorting, 'sorting');
    }
    return queryString;
}

export function updateQueryStringParameter(uri: string, key: string , value: string): string {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2');
    }
    else {
        return uri + separator + key + '=' + value;
    }
}
