export interface SearchFacetModel {
    name: string;
    id: string;
    hitCount: number;
    subFacets: SearchFacetModel[];
    active: boolean;
    type: string;
}

export function mapSearchFacet(data, type): SearchFacetModel {
    if (!data)
        return {} as SearchFacetModel;
    return {
        id: data.id.toString(),
        name: data.name,
        hitCount: data.hitCount,
        subFacets: data.subTag.length > 0 ? data.subTag.map((item) => mapSearchFacet(item, type)) : [] as SearchFacetModel[],
        active: false,
        type: type
    } as SearchFacetModel;
}
