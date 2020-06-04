import '../css/main.scss';
import 'bootstrap';
import Vue from 'vue';
import SearchPane from './components/search/search-pane/SearchPane.vue';
import SearchResults from './components/search/search-pane/SearchResults.vue';
import FacetsPane from './components/search/facets-pane/FacetsPane.vue';
import FacetsList from './components/search/facets-pane/FacetsList.vue';
Vue.component('SearchPane', SearchPane);
Vue.component('SearchResults', SearchResults);
Vue.component('FacetsPane', FacetsPane);
Vue.component('FacetsList', FacetsList);
export const App = new Vue({
    el: '#app',
});




