export interface AutocompleteSearchResult {
    label: string;
    href: string;
}

export function getAutocompleteSearchResults(data: any): AutocompleteSearchResult[] {
    return data.map((x: any) => {
        return {
            label: x.Label,
            href: x.Href
        } as AutocompleteSearchResult;
    });
}
