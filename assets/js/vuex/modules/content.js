const contentTypeComponentMap = {
    'Form':'AppForm',
    'List':'AppList'
};

const state = {
    type: null,
    item: null,
};

const actions = {
    setContentDetails({ rootGetters,commit },payload){
        let action = payload.to.params.Action,
            methodObj = rootGetters.actions[action].method,
            type = methodObj.method || methodObj.type,
            item = methodObj.idn1;
        commit('updateActive', type); commit('setItem', item);
        commit('setRequestItems',{ type, item },{ root:true });
    },
    setRequests({ commit }){
        commit({ type:'setRequest', request:{ head:{ source:{ component:'AppContent' } } } }, { root:true });
    }
};

const mutations = {
    updateActive(state,type){ state.type = type },
    setItem(state,item){ state.item = item },
};

const getters = {
    type(state){ return state.type; },
    item(state){ return state.item; },
    component(state){ return contentTypeComponentMap[state.type]; }
};

export default {
    namespaced: true,
    state, getters, actions, mutations
};
