<script lang="ts">
    import Vue from 'vue';
    import {SearchFacetsGroupModel} from '../../../models/Search/SearchFacetsGroupModel';
    export default Vue.extend({
        name: 'FacetsPane',
        props: {
            facets: {
                type: Array as () => SearchFacetsGroupModel[],
                required: false,
                default: (): SearchFacetsGroupModel[] => { return [] as SearchFacetsGroupModel[] }
            },
        },
        data: function() {
            return {
                genre: {} as SearchFacetsGroupModel,
                size: {} as SearchFacetsGroupModel,
                length: {} as SearchFacetsGroupModel,
                category: {} as SearchFacetsGroupModel,
            }
        },
        watch: {
            facets: function(): void {
                this.genre = this.getFacetGroup('Genre');
                this.size = this.getFacetGroup('Size');
                this.length = this.getFacetGroup('Length');
                this.category = this.getFacetGroup('Category');
            }
        },
        methods: {
            getFacetGroup: function(facetGroupToSearch: string): SearchFacetsGroupModel {
                const tags = this.facets.filter((facetGroup: SearchFacetsGroupModel) => facetGroup.name === facetGroupToSearch );
                if (tags.length > 0) {
                    return tags[0];
                }
                return {} as SearchFacetsGroupModel;
            }
        }
    });
</script>

<template>
  <div>
    <slot
      :data="{
        genre: genre,
        size: size,
        length: length,
        category: category,
      }"
    />
  </div>
</template>
