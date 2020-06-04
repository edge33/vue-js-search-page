<script lang="ts">
    import Vue from 'vue';
    import moment from 'moment';
    import {EventBus} from '../../../eventBus';
    import {SearchResultsModel} from '../../../models/Search/SearchResultsModel';
    import {FacetInputModel, SearchQueryInputModel} from '../../../common/SearchQueryInputModel';
    import {getSearchResults} from '../SearchService';
    import {clearAllFacets, clearFacets, toggleFacet} from '../../../common/SearchQueryModelBuilder';
    import {activateCheckedFacets} from '../../../models/Search/SearchFacetsGroupModel';
    import {getUrlParams, toQueryString} from '../../../common/QueryStringParser';
    export default Vue.extend({
        name: 'SearchPage',
        props: {
            items: {
                type: Number,
                required: false,
                default: 10
            },
            sorting: {
                type: String,
                required: false,
                default: ''
            },
            isListingPage: {
                type: Boolean,
                required: false,
                default: false
            },
            searchUrl: {
                type: String,
                required: false,
                default: ''
            },
        },
        data: () => {
            return {
                searchQuery: {} as SearchQueryInputModel,
                loading: true as boolean,
                searchResults: {
                  hitCount: 0
                } as SearchResultsModel,
                selectedSorting: '' as string,
                pageStart: 0 as number
            };
        },
        computed: {
            hasMoreItems: function(): boolean {
                return this.searchResults.hitCount > this.searchQuery.pageStart + this.items;
            },
            hitCount: function(): number {
                return this.searchResults.hitCount;
            },
            numberEndItemList: function(): number {
                if (this.searchResults.results) {
                    return this.searchResults.results.length;
                }
                return 0;
            }
        },
        mounted(): void {
            this.searchQuery = getUrlParams(document.location.search);
            if (this.searchQuery.count > 10)
                this.searchQuery.count = this.items;
            this.fireQuery();
            window.addEventListener(
                'popstate', () => {
                    this.searchQuery = window.history.state;
                    this.fireQuery();
                }
            );

            EventBus.$on('facet-clicked', (id: string, type: string) => {
                toggleFacet(this.searchQuery, id, type);
                this.searchQuery.pageStart = 0;
                this.fireQuery();
            });

            EventBus.$on('facets-cleared', (facetsType: string) => {
                clearFacets(this.searchQuery, facetsType);
                this.fireQuery();
            });

            EventBus.$on('clear-all-facets', () => {
                clearAllFacets(this.searchQuery);
                this.fireQuery();
            });

            EventBus.$on('date-changed', (startDate: string, endDate: string) => {
                this.searchQuery.pageStart = 0;
                const parsedStartDate = moment(startDate, 'DD/MM/YYYY');

                if (parsedStartDate.isValid()) {
                    this.searchQuery.startDate = parsedStartDate.format('YYYYMMDD');
                } else {
                    this.searchQuery.startDate = '';
                }
                const parsedEndDate = moment(endDate, 'DD/MM/YYYY');
                if (parsedEndDate.isValid()) {
                    this.searchQuery.endDate = parsedEndDate.format('YYYYMMDD');
                } else {
                    this.searchQuery.endDate = '';
                }
                this.fireQuery();
            });

            EventBus.$on('load-more-clicked', () => {
                this.loadMoreItems();
            });

            EventBus.$on('sorting-changed', (sorting: string) => {
                this.searchQuery.sorting = [sorting];
                this.selectedSorting = sorting;
                this.searchQuery.pageStart = 0;
                this.fireQuery();
            });


        },
        methods: {
            fireQuery(): void  {
                const queryString: string = toQueryString(this.searchQuery);
                history.pushState(this.searchQuery, 'search', `?${queryString}`);
                this.loading = true;

                getSearchResults(this.searchUrl, this.searchQuery)
                    .then((searchResults: SearchResultsModel) => {
                        this.searchResults = searchResults;
                        activateCheckedFacets(this.searchResults.searchFacets, this.searchQuery.facets.map((item: FacetInputModel) => item.id));
                        this.loading = false;
                    });
            },
            loadMoreItems(): void {
                this.searchQuery.pageStart = this.searchQuery.pageStart + this.searchQuery.count;
                this.searchQuery.count = this.items;
                const queryString: string = toQueryString(this.searchQuery);
                const state = {
                    state: this.searchResults,
                    searchQuery: this.searchQuery
                }
                history.pushState(state, 'search', `?${queryString}`);

                getSearchResults(this.searchUrl, this.searchQuery)
                    .then((response: SearchResultsModel) => {
                        this.searchResults.results = this.searchResults.results.concat(response.results);
                        this.searchResults.hitCount = response.hitCount;
                        this.loading = false;
                    });
            }
        },
    });
</script>

<template>
  <div>
    <slot
      :data="{
        loading: loading,
        searchQuery: searchQuery,
        searchResults: searchResults,
        pageStart: pageStart,
        hasMoreItems: hasMoreItems,
        hitCount: hitCount,
        selectedSorting: selectedSorting,
        loadMoreItems: loadMoreItems
      }"
    />
  </div>
</template>


<style>
    #search-result-spinner {
        width: 50px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
