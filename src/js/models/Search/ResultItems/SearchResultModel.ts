export interface SearchResultModel {
    date: string;
    name: string;
    pageUrl: string;
    pictureUrl: string;
    id: number;
}

export function mapSearchResult(obj): SearchResultModel {
    return {
        date: obj.date,
        name: obj.name,
        pageUrl: obj.pageUrl,
        pictureUrl: obj.pictureUrl,
        id: obj.id
    };
}
