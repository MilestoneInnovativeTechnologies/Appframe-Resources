const state = {
    lists: {},
    detail: {},
    layout: {},
    selected: {},
    handler: {
        'ListData': 'setDetail',
        'ListLayout': 'setLayout',
        'List': 'mergeList'
    }
};

const actions = {
    update({ rootGetters,dispatch },action){
        dispatch('post',{ action,update:true },{ root:true });
    },
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
};

const getters = {
    list(state){ return (id) => state.lists[id] },
    layout(state){ return (id) => state.layout[id] },
    details(state){ return (id) => state.details[id] },
    selected(state){ return (id) => state.selected[id] },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}