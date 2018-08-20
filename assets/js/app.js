
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('./axios');
require('./framework');

require('./store');
require('./router');
require('./components');

global.VueApp = new Vue({
    el: '#app',
    store: AppVuexStore,
    router: AppVueRouter,
    created(){ token.post('fresh'); },
    beforeCreate(){ $("#slow_connection_page_loading").remove(); }
});
