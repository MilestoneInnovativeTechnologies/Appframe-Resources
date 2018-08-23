const state = {
    actions: {},
    handler: {
        'Resolve':'storeResolve',
    }
};

const actions = {
    beforeEachRoute({ commit,dispatch },{ to }){
        if(!to.params.action) return;
        dispatch('resolveAction',to.params.action);
        commit('proceedRoute',null,{ root:true })
    },
    resolveAction({ state,dispatch },action){
        if(!state.actions[action]) return dispatch('loadAction',action);
    },
    loadAction({ dispatch },action){
        dispatch('post',{ action },{ root:true })
    },
    storeResolve(ctx,payload){
        console.log('RSLV/storeResolve dispatched: ',payload);
    },
};

const mutations = {
};

const getters = {
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}
