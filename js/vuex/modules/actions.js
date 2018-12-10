const state = {
    store: {},
    display: {},
    menu: {},
    list: {},
    data: {},
    confirm: {},
    resource: {},
};

const actions = {
    init({ rootGetters,commit }){
        _.forEach(rootGetters._actions,function(action){
            _.forEach(actionRunCommits,(mutation) => commit(mutation,action))
        })
    },
    action({ dispatch },payload){
        dispatch('navigate',payload,{ root:true });
    },
};

const mutations = {
    storeAction(state,{ id,name,description,title }){ state.store = Object.assign({},state.store,_.fromPairs([[id,{ id,name,description,title }]])); },
    setDisplay(state,{ id,type,icon,set,title }){ state.display = Object.assign({},state.display,_.fromPairs([[id,{ id,type,icon,set,title }]])); },
    setMenu(state,{ id,resource,menu }){ if(!menu) return; if(!state.menu[resource]) state.menu = Object.assign({},state.menu,_.fromPairs([[resource,[]]])); state.menu[resource].push({ id,resource,menu }) },
    setResourceActions(state,{ id,resource }){
        if(!state.resource[resource]) state.resource = Object.assign({},state.resource,_.zipObject([resource],[[]]));
        state.resource[resource].push(id);
    },
    setListActions(state,{ id,lists }){ if(_.isEmpty(lists)) return;
        _.forEach(lists,function({ resource_list }){ if(!state.list[resource_list]) state.list = Object.assign({},state.list,_.fromPairs([[resource_list,[]]])); state.list[resource_list].push(id); })
    },
    setDataActions(state,{ id,data }){ if(_.isEmpty(data)) return;
        _.forEach(data,function({ resource_data }){ if(!state.data[resource_data]) state.data = Object.assign({},state.data,_.fromPairs([[resource_data,[]]])); state.data[resource_data].push(id); })
    },
    setConfirm(state,{ id,confirm }){ if(!confirm) return; state.confirm = Object.assign({},state.confirm,_.fromPairs([[id,confirm]])) },
};

const getters = {
    actions(state){ return (content,id) => _.mapValues(state[_.lowerCase(content)][id],(action) => state.display[action]); },
    confirm(state){ return (id) => state.confirm[id] },
    resource(state){ return (action) => _.findKey(state.resource,(actions) => _.includes(actions,action)); },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}

const actionRunCommits = [
    'storeAction','setDisplay','setMenu','setResourceActions','setListActions','setDataActions','setConfirm'
];