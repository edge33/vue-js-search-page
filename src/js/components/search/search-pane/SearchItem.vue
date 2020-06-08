<script lang="ts">
    import Vue from 'vue';
    import {SearchResultModel} from '../../../models/Search/ResultItems/SearchResultModel';
    export default Vue.extend({
        name: 'SearchItem',
        props: {
            item: {
                type: Object as () => SearchResultModel,
                required: true,
                default: (): SearchResultModel => { return {} as SearchResultModel}
            },
        },
        methods: {
            redirectToItem(): void {
                window.location.href = this.item.pageUrl;
            }
        },
    });
</script>

<template>
  <div
    class="col-md-6 search-item"
    @click="redirectToItem"
  >
    <p class="title">
      <a :href="item.pageUrl">{{ item.name }}</a>
    </p>
    <img
      alt="{item.name}"
      :src="item.pictureUrl"
      style="max-width: 200px"
    >
    <p>{{ item.date }}</p>
  </div>
</template>

<style>
    .search-item {
        margin-top: 10px;
        cursor: pointer;
    }

    .title {
        font-weight: bold;
    }
</style>
