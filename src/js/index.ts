import '../css/main.scss';
import 'bootstrap';
import Vue from 'vue';
import SearchPane from './components/search/search-pane/SearchPane.vue';
import SearchResults from './components/search/search-pane/SearchResults.vue';
import FacetsPane from './components/search/facets-pane/FacetsPane.vue';
import FacetsList from './components/search/facets-pane/FacetsList.vue';
import FacetItem from './components/search/facets-pane/FacetItem.vue';
import SubFacetItem from './components/search/facets-pane/SubFacetItem.vue';
import ActiveFacetsPane from './components/search/facets-pane/ActiveFacetsPane.vue';
import SearchItem from './components/search/search-pane/SearchItem.vue';
Vue.component('SearchPane', SearchPane);
Vue.component('SearchResults', SearchResults);
Vue.component('FacetsPane', FacetsPane);
Vue.component('FacetsList', FacetsList);
Vue.component('FacetItem', FacetItem);
Vue.component('SubFacetItem', SubFacetItem);
Vue.component('ActiveFacetsPane', ActiveFacetsPane);
Vue.component('SearchItem', SearchItem);
export const App = new Vue({
    el: '#app',
});




