const state = {
    AppContent: null,
};

const actions = {
    beforeEachRoute({ state,commit },{ to }){
        if(to && to.meta && to.meta.target) commit('setContentAction',{ content:to.meta.target,action:to.params.action });
        commit('proceedRoute',null,{ root:true });
    }
};

const mutations = {
    setContentAction(state,{ content,action }){ state[content] = action; }
};

const getters = {
    resolution(state,getters,rootState,rootGetters){ return (action) => rootGetters.resolution(action); },
    action(state){ return (target) => state[target]; }
};

export default {
    namespaced: true,
    state, getters, actions, mutations
};
