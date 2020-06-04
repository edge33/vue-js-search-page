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
  <div>
    <slot
      :data="{
        searchResults: searchResults,
        hasMoreItems: hasMoreItems,
        selectedSorting: selectedSorting,
        sortingChanged: sortingChanged,
        loadMore: loadMore
      }"
    />
  </div>
</template>
