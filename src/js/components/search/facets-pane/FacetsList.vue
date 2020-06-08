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
        },
        data: function() {
            return {
                expanded: false
            }
        },
        computed: {
            clearFilterActive: function(): boolean {
                return this.facets.filter((facet: SearchFacetModel) => facet.active).length > 0;
            },
        },
        methods: {
            clearFacets(): void {
                EventBus.$emit('facets-cleared', this.name);
            },
            toggleSection(value: boolean): void {
                this.expanded = value;
                const filterGroup = document.querySelector(`#filter-${this.name}`);
                if (filterGroup != null) {
                    filterGroup.scrollIntoView();
                }
            }
        }
    });
</script>

<template>
  <div
    :id="'filter-' + name"
  >
    <div class="title">
      {{ name }}
    </div>
    <ul class="wk-content-filter-list">
      <facet-item
        v-for="(facet, index) in facets"
        v-show="index < itemsToShow || expanded"
        :key="facet.id"
        :facet="facet"
        :facet-type="name"
      />
    </ul>
    <div>
      <a
        v-if="facets.length > itemsToShow && !expanded"
        class="btn btn-primary"
        href="javascript:void(0)"
        @click="toggleSection(true)"
      >Show More</a>
      <a
        v-if="expanded"
        class="btn btn-primary"
        href="javascript:void(0)"
        @click="toggleSection(false)"
      >Show Less</a>
      <a
        class="btn btn-danger"
        :class="{ 'visible': clearFilterActive, 'invisible': !clearFilterActive }"
        href="javascript:void(0)"
        @click="clearFacets"
      >Clear Filters</a>
    </div>
  </div>
</template>

<style>
  ul {
    padding: 0px;
  }
  .title {
    font-weight: bold;
  }
</style>
