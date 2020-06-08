<script lang="ts">
    import Vue from 'vue';
    import {EventBus} from '../../../eventBus';
    import {SearchResultsModel} from '../../../models/Search/SearchResultsModel';
    export default Vue.extend({
        name: 'SearchResults',
        props: {
            searchResults: {
                type: Object as () => SearchResultsModel,
                required: true,
                default: (): SearchResultsModel => {return {} as SearchResultsModel}
            },
            hasMoreItems: {
                type: Boolean,
                required: false,
                default: false
            },
            sorting: {
                type: String,
                required: true,
                default: ''
            }
        },
        data: function() {
            return {
                selectedSorting: 'actuality'
            }
        },
        watch:{
            sorting: function(val: string): void {
                if (val && val.length > 0 )
                    this.selectedSorting = val;
            }
        },
        methods: {
            loadMore: function(): void {
                EventBus.$emit('load-more-clicked');
            },
            sortingChanged: function(): void {
                EventBus.$emit('sorting-changed', this.selectedSorting);
            }
        }
    });
</script>

<template>
  <div class="row">
    <div class="col-md-6">
      <p>there is a total of {{ searchResults.hitCount }} item{{ searchResults.hitCount > 1 ? 's' : '' }}</p>
    </div>
    <div class="col-md-6 text-right">
      Sort by:
      <select
        v-model="selectedSorting"
        name="sort-by"
        aria-label="sort products by"
        @change="sortingChanged"
      >
        <option value="relevance">
          Relevance
        </option>
        <option value="actuality">
          Date
        </option>
      </select>
    </div>
    <div class="row">
      <search-item
        v-for="(item) in searchResults.results"
        :key="item.Name"
        :item="item"
      />
    </div>
    <div class="col-md-12 text-center">
      <div
        class="btn btn-primary"
        @click="loadMore"
      >
        Load More
      </div>
    </div>
  </div>
</template>
