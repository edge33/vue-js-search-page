import '../css/main.scss';
import 'bootstrap';
import Vue from 'vue';
import ButtonComponent from './components/Button.vue';

Vue.component('ButtonComponent', ButtonComponent);
export const App = new Vue({
    el: '#app',
});




