const state = {
    actions: {},
    list: {},
};

const actions = {
    initAction({ state,dispatch },payload){
        if(state[payload.type] && state[payload.type][payload.item]) return;
        dispatch('loadActions',payload);
    },
    loadActions({ rootGetters,commit },payload){
        let props = itemToActionFetchPropMap[payload.type], actions = [], itemActs = {};
        _.forEach(rootGetters._actions,function(action){
            if(!_.isEmpty(action[props[0]])) {
                actions = _.concat(actions, _.map(_.groupBy(action[props[0]], props[1])[payload.item], props[2]));
            }
        });
        itemActs[payload.item] = actions; commit('setItemActions',{ item:payload.type,id:payload.item,actions });
        commit('addActions',_.pick(rootGetters.actions,actions));
    }
};

const mutations = {
    addActions(state,actions){ state.actions = Object.assign({},state.actions,actions); },
    setItemActions(state,payload){ let itemActs = {}; itemActs[payload.id] = payload.actions; state[payload.item] = Object.assign({},state[payload.item],itemActs); },
};

const getters = {
    actions(state){
        return function(item,id){
            return _.pick(state.actions,state[item][id])
        }
    }
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}

const itemToActionFetchPropMap = {
    'list': ['lists','resource_list','resource_action'],//[0] -> prop where to lookup for array. [1] -> prop to group by. [2] -> get action id from column
};