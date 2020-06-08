<script lang="ts">
    import Vue from 'vue';
    import {SearchFacetModel} from '../../../models/Search/SearchFacetModel';
    import {EventBus} from '../../../eventBus';
    export default Vue.extend({
        name: 'FacetItem',
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
        data: function() {
            return {
                expanded: false
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
  <div>
    <li>
      <a
        class="filter-item"
        :class="{'active' : facet.active}"
        @click.stop="clickedFacet(facet.id)"
      >
        <span>{{ facet.name }} - {{ facet.hitCount }}</span>
      </a>
    </li>
  </div>
</template>


<style>
  li {
    list-style: none;
  }
  .filter-item {
    cursor: pointer;
  }
  .active {
    font-weight: bold;
  }
</style>
