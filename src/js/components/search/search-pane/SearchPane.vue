<script lang="ts">
    import Vue from 'vue';
    import {EventBus} from '../../../eventBus';
    import {SearchResultsModel} from '../../../models/Search/SearchResultsModel';
    import {
      FacetInputModel,
      getSearchQueryInputModel,
      SearchQueryInputModel
    } from '../../../common/SearchQueryInputModel';
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
            }
        },
        mounted(): void {
            this.searchQuery = getUrlParams(document.location.search);
            if (this.searchQuery.count > 10)
                this.searchQuery.count = this.items;
            this.fireQuery();
            window.addEventListener(
                'popstate', () => {
                    this.searchQuery = window.history.state != null ? window.history.state : getSearchQueryInputModel();
                    this.doSearch();
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
                this.doSearch();

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
                        EventBus.$emit('load-more-done');
                    });
            },
            doSearch(): void {
              getSearchResults(this.searchUrl, this.searchQuery)
                      .then((searchResults: SearchResultsModel) => {
                        this.searchResults = searchResults;
                        activateCheckedFacets(this.searchResults.searchFacets, this.searchQuery.facets.map((item: FacetInputModel) => item.id));
                        this.loading = false;
                      });
            }
        }
    });
</script>

<template>
  <div class="row">
    <div class="col-md-12">
      <div
        v-show="loading"
        class="row"
      >
        <div class="col-md-12 text-center">
          <spinner />
        </div>
      </div>
      <div
        v-show="!loading"
        class="row"
      >
        <div class="col-md-4">
          <p>Filters:</p>
          <facets-pane :facets="searchResults.searchFacets" />
        </div>
        <div class="col-md-8">
          <active-facets-pane :facets="searchResults.searchFacets" />

          <search-results
            :search-results="searchResults"
            :has-more-items="hasMoreItems"
            :sorting="selectedSorting"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<style>
    #search-result-spinner {
        width: 50px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
