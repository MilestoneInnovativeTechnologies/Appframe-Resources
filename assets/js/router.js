
const components = {
    breadcrumb: require('../components/AppBreadcrumb'),
    appcontent: require('../components/AppContent'),
};

const props = new Object({ ..._.mapValues(components,()=>true) });

const menuActionBeforeEnter = function(to, from, next){
    console.log('menuActionBeforeEnter => Called');
    let type = 'menuActionTriggered', payload = { to, from, next, type };
    window.AppVuexStore.dispatch(payload);
};

const routes = [
    { path: '/action/:Action', name: 'menu-action', props, components }
];

global.AppVueRouter = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'has-active'
});
AppVueRouter.beforeEach((to, from, next)=>{
    let type = 'routeChange', payload = { to, from, next, type },
        CallVueAppStoreAction = function(payload){
            if(window.VueApp && window.VueApp.$store.getters.authToken) return window.VueApp.$store.dispatch(payload);
            setTimeout(CallVueAppStoreAction,400,payload);
        };
    CallVueAppStoreAction(payload);
});