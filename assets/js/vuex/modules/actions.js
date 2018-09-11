const state = {
    store: {},
    display: {},
    menu: {},
    list: {},
    data: {},
};

const actions = {
    init({ rootGetters,commit }){
        _.forEach(rootGetters._actions,function(action){
            _.forEach(actionRunCommits,(mutation) => commit(mutation,action))
        })
    }
};

const mutations = {
    storeAction(state,{ id,name,description,title }){ state.store = Object.assign({},state.store,_.fromPairs([[id,{ id,name,description,title }]])); },
    setDisplay(state,{ id,type,icon,set,title }){ state.display = Object.assign({},state.display,_.fromPairs([[id,{ id,type,icon,set,title }]])); },
    setMenu(state,{ id,resource,menu }){ if(!menu) return; if(!state.menu[resource]) state.menu = Object.assign({},state.menu,_.fromPairs([[resource,[]]])); state.menu[resource].push({ id,resource,menu }) },
    setListActions(state,{ id,lists }){ if(_.isEmpty(lists)) return;
        _.forEach(lists,function({ resource_list }){ if(!state.list[resource_list]) state.list = Object.assign({},state.list,_.fromPairs([[resource_list,[]]])); state.list[resource_list].push(id); })
    },
    setDataActions(state,{ id,data }){ if(_.isEmpty(data)) return;
        _.forEach(data,function({ resource_data }){ if(!state.data[resource_data]) state.data = Object.assign({},state.data,_.fromPairs([[resource_data,[]]])); state.data[resource_data].push(id); })
    },
};

const getters = {
    actions(state){ return (content,id) => _.mapValues(state[_.lowerCase(content)][id],(action) => state.display[action]); }
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}

const actionRunCommits = [
    'storeAction','setDisplay','setMenu','setListActions','setDataActions'
];