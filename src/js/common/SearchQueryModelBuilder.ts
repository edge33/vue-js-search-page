import {FacetInputModel, SearchQueryInputModel} from './SearchQueryInputModel';

export function setSearchString(searchQueryModel: SearchQueryInputModel, searchString: string): void {
    if (searchString && searchString.length > 0)
        searchQueryModel.searchQuery = searchString;
}

export function toggleFacet(searchQueryModel: SearchQueryInputModel, id: string, facetType: string): void {
    if (!id || id.length === 0)
        return;

    const facetsIds = searchQueryModel.facets.map((facet: FacetInputModel) => facet.id);
    const index = facetsIds.indexOf(id);
    if (index !== -1)
        searchQueryModel.facets.splice(index,1);
    else {
        searchQueryModel.facets.push({id: id, type: facetType} as FacetInputModel);
    }
}

export function clearFacets(model: SearchQueryInputModel, facetType: string): void  {
    model.facets = model.facets.filter((item: FacetInputModel) => item.type !== facetType);
}

export function clearAllFacets(model: SearchQueryInputModel): void {
    model.facets.splice(0, model.facets.length);
}
