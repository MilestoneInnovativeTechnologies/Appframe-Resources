const state = {
    count: -1,
    routes: {},
    set: [],
};

const actions = {
    afterEachRoute({ state,rootGetters,commit },{ to }){
        commit('increment'); commit('addRoute',to); if(!state.count) return;
        if(to.name === 'menu-action') commit('addNewSet',rootGetters.resources[rootGetters.actionResource(to.params.action)]);
        commit('addToSet')
    }
};

const mutations = {
    increment(state){ state.count++ },
    addRoute(state,to){ state.routes = Object.assign({},state.routes,_.zipObject([state.count],[{ name:to.name,params:to.params,title:null }])) },
    addNewSet(state,resource){ state.set.push([resource]) },
    addToSet(state){ state.set[state.set.length-1].push(state.count) },
    setTitle(state,title){ state.routes[state.count].title = title }
};

const getters = {
    set(state){ return (n = null) => _.map(state.set[n === null ? state.set.length-1 : n],function(route,index){ return (index) ? state.routes[route] : route}) },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}