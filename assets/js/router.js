
const components = {
    breadcrumb: require('../components/AppBreadcrumb'),
    appcontent: require('../components/AppContent'),
};

const props = new Object({ ..._.mapValues(components,()=>true) });

const routes = [
    { path: '/action/:action', name: 'menu-action', props, components }
];

global.AppVueRouter = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'has-active'
});
AppVueRouter.beforeEach(function(to, from, next){
    let payload = { type:'beforeEach', to, from, next };
    CallVueAppStoreAction = function(payload){
        if(window.VueApp && window.VueApp.$store) return window.VueApp.$store.dispatch('routeHook',payload);
        setTimeout(CallVueAppStoreAction,400,payload);
    };
    CallVueAppStoreAction(payload);
});