
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
    beforeCreate(){ $("#slow_connection_page_loading").remove(); },
    created(){
        let vuex = this.$store;
        _.forEach(this.$store._modulesNamespaceMap,function(Obj,Module){
            let init = Module + 'init';
            if(vuex._actions[init]) vuex.dispatch(init).then(null);
            if(vuex._mutations[init]) vuex.commit(init);
        });
    },
});
