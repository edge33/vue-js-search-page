import {mapSearchFacet, SearchFacetModel} from './SearchFacetModel';

export interface SearchFacetsGroupModel {
    id: string;
    name: string;
    tags: SearchFacetModel[];
}

export function mapSearchFacetsGroup(x): SearchFacetsGroupModel {
    return {
        id: x.id,
        name: x.name,
        tags: x.tags.map((tag) => mapSearchFacet(tag, x.Name) )
    } as SearchFacetsGroupModel;
}

export function activateCheckedFacets(facets: SearchFacetsGroupModel[], checkedIds: string[]): void {
    facets.forEach((facetGroup: SearchFacetsGroupModel) => {
        facetGroup.tags.forEach((item: SearchFacetModel) => {
             if( checkedIds.indexOf(item.id) !== -1)
                 item.active = true;
             item.subFacets.forEach((subFacet: SearchFacetModel) => {
                 if (checkedIds.indexOf(subFacet.id) !== -1)
                     subFacet.active = true;
             })
        });
    })
}
