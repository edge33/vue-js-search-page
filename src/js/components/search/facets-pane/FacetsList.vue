<script lang="ts">
    import Vue from 'vue';
    import {SearchFacetModel} from '../../../models/Search/SearchFacetModel';
    import {EventBus} from '../../../eventBus';

    export default Vue.extend({
        name: 'FacetsList',
        props: {
            itemsToShow: {
                type: Number,
                required: false,
                default: 5
            },
            facets: {
                type: Array as () => SearchFacetModel[],
                required: true,
                default: (): SearchFacetModel[] => [] as SearchFacetModel[]
            },
            name: {
                type: String,
                required: true,
                default: ''
            },
            title: {
                type: String,
                required: true,
                default: ''
            }
        },
        data: function() {
            return {
                expanded: false
            }
        },
        computed: {
            clearFilterActive: function(): boolean {
                return this.facets.filter((facet: SearchFacetModel) => (facet.active && facet.subFacets.length === 0)
                    || facet.subFacets.filter((subFacet: SearchFacetModel) => subFacet.active)
                        .length > 0)
                    .length > 0;
            },
            sectionExpanded: function(): boolean {
                return this.expanded && this.facets.length > this.itemsToShow;
            }
        },
        methods: {
            clearFacets(): void {
                EventBus.$emit('facets-cleared', this.name);
            },
            toggleSection(value: boolean): void {
                this.expanded = value;
                const filterGroup = document.querySelector(`#filter-${this.title}`);
                if (filterGroup != null) {
                    filterGroup.scrollIntoView();
                }
            }
        }
    });
</script>

<template>
  <div>
    <slot
      :data="{
        title: title,
        facets: facets,
        itemsToShow: itemsToShow,
        sectionExpanded: sectionExpanded,
        toggleSection: toggleSection,
        clearFilterActive: clearFilterActive,
        clearFacets: clearFacets
      }"
    />
  </div>
</template>
