export interface SearchFacetModel {
    name: string;
    id: string;
    hitCount: number;
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
        active: false,
        type: type
    } as SearchFacetModel;
}
