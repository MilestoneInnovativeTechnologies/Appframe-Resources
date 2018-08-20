const state = {
    store: {},
    detail: {},
    layout: {},
};

const actions = {
    setComponent({ commit }){
        let type = 'setRequest',
            request = { head: {source: { component: 'AppList'} } };
        commit({ type, request }, { root:true });
    },
    setRequestItems({ getters,commit }){
        let item = getters.listId, type = 'List',force = (!getters.details || !getters.layout);
        commit('setRequestItems', { item,type,force }, { root:true });
    },
    setRequestRelations({ commit },payload){
        commit('setRequestRelations', payload, { root:true });
    },
    getList({ dispatch }){
        dispatch('setRequestItems');
        dispatch('SPST/postRequestServer', null, { root:true })
    },

    mergeList({ commit },{ data }){
        if(data.ListData) commit('setDetail',data.ListData);
        if(data.ListLayout) commit('setLayout',data.ListLayout);
        let id = data.request.item.item, list = data.List[id];
        commit('mergeList',{ id,list });
    },

};

const mutations = {
    mergeList(state,{ id,list }){
        let Obj = {}; Obj[id] = []; if(!state.store[id]) state.store = Object.assign({},state.store,Obj);
        if(_.isEmpty(list)) return; state.store[id] = Object.assign({},state.store[id],_.keyBy(list,'id'));
    },
    setDetail(state,payload){ state.detail = Object.assign({},state.detail,payload); },
    setLayout(state,payload){ state.layout = Object.assign({},state.layout,payload); },
};

const getters = {
    listId(state,getters,rootState,rootGetters){ return rootGetters['CONT/item'] },
    list(state,getters){ return state.store[getters.listId] },
    layout(state,getters){ return state.layout[getters.listId] },
    details(state,getters){ return state.detail[getters.listId] },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}