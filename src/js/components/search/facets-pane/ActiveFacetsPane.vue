<script lang="ts">
    import Vue from 'vue';
    import {SearchFacetsGroupModel} from '../../../models/Search/SearchFacetsGroupModel';
    import {SearchFacetModel} from '../../../models/Search/SearchFacetModel';
    import {EventBus} from '../../../eventBus';
    export default Vue.extend({
        name: 'ActiveFacetsPane',
        props: {
            facets: {
                type: Array as () => SearchFacetsGroupModel[],
                required: true,
                default: (): SearchFacetsGroupModel[] => {return [] as SearchFacetsGroupModel[]}
            }
        },
        data: function() {
            return {
                activeFacets: [] as SearchFacetModel[],
                activeFacetsCount: 0 as number
            }
        },
        watch: {
            facets: function(): void {
                this.activeFacets = [];
                this.facets.forEach((facetGroup: SearchFacetsGroupModel) => {
                    this.activeFacets.concat(facetGroup.tags);
                    facetGroup.tags.forEach((tag: SearchFacetModel) => {
                        this.activeFacets.push(tag);
                    })
                });
                this.activeFacets = this.activeFacets.filter((facet: SearchFacetModel) => facet.active);
            }
        },
        methods: {
            removeFacet(facetId: string): void {
                const clickedFacet: SearchFacetModel = this.activeFacets.filter((facet: SearchFacetModel) => facet.id === facetId)[0];
                EventBus.$emit('facet-clicked', clickedFacet.id, clickedFacet.type);
                if (clickedFacet.type === 'Auteurs') {
                    EventBus.$emit('clear-author-field');
                }
            },
            clearFacets(): void {
                EventBus.$emit('clear-all-facets');
            }
        }
    })
</script>


<template>
  <div
    v-show="activeFacets.length > 0"
    class=""
  >
    <ul class="">
      <li
        v-for="facet in activeFacets"
        :key="facet.id"
      >
        <a
          href="javascript:void(0)"
          @click="removeFacet(facet.id)"
        >{{ facet.name }}</a>
      </li>
    </ul>
    <div class="filter-actions">
      <button
        class="btn btn-danger"
        href="javascript:void(0)"
        @click="clearFacets"
      >
        Clear all filters
      </button>
    </div>
  </div>
</template>
