const state = {
    lists: {},
    detail: {},
    layout: {},
    selected: {},
    actions: {},
    handler: {
        'ListData': ['setDetail','setActions'],
        'ListLayout': 'setLayout',
        'List': 'mergeList'
    }
};

const actions = {
    update({ rootGetters,dispatch },action){
        dispatch('post',{ action,update:true },{ root:true });
    },
    setActions({ rootGetters,commit },{ _response_data }){
        let id = _.keys(_response_data.List)[0], actions = [];
        _.forEach(rootGetters._actions,function(action){
            if(action.lists && !_.isEmpty(action.lists)){
                _.forEach(action.lists,function(list){
                    if(list.resource_list == id){
                        actions.push(list.resource_action);
                    }
                })
            }
        });
        commit('setActions',{ list:id,actions })
    }
};

const mutations = {
    mergeList(state,{ List }){
        let id = _.keys(List)[0], Obj = {}; Obj[id] = [];
        if(!state.lists[id]) { state.lists = Object.assign({},state.lists,Obj); let selected = {}; selected[id] = null; state.selected = Object.assign({},state.selected,selected) }
        if(_.isEmpty(List[id])) return; state.lists[id] = Object.assign({},state.lists[id],_.keyBy(List[id],'id'));
    },
    setDetail(state,{ ListData }){ state.detail = Object.assign({},state.detail,ListData); },
    setLayout(state,{ ListLayout }){ state.layout = Object.assign({},state.layout,ListLayout); },
    setSelected(state,{ list,record }){ state.selected[list] = record; },
    setActions(state,{ list,actions }){ let action = {}; action[list] = actions; state.actions = Object.assign({},state.actions,action) },
};

const getters = {
    list(state){ return (id) => state.lists[id] },
    layout(state){ return (id) => state.layout[id] },
    details(state){ return (id) => state.details[id] },
    selected(state){ return (id) => state.selected[id] },
    actions(state){ return (id) => state.actions[id] },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}