<script lang="ts">
    import Vue from 'vue';
    import {EventBus} from '../../../eventBus';
    import {SearchFacetModel} from '../../../Models/Search/SearchFacetModel';
    export default Vue.extend({
        name: 'SubFacetItem',
        props: {
            facet: {
                type: Object as () => SearchFacetModel,
                required: true,
                default: (): SearchFacetModel => { return {} as SearchFacetModel }
            },
            facetType: {
                type: String,
                required: true,
                default: ''
            }
        },
        methods: {
            clickedFacet: function (id: string): void {
                this.facet.active = !this.facet.active;
                EventBus.$emit('facet-clicked', id, this.facetType);
            }
        }
    });
</script>


<template>
  <li class="wk-content-filter-subitem">
    <a
      :class="{'active' : facet.active}"
      class="subitem-link"
      href="javascript:void(0)"
      @@click.stop="clickedFacet(facet.id)"
    ><span class="chevron-down" />{{ facet.name }}</a>
    <div class="subitem-count">
      {{ facet.hitCount }}
    </div>
  </li>
</template>
