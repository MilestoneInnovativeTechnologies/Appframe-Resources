const state = {
    lists: {},
    detail: {},
    layout: {},
    selected: {},
    relation: {},
    handler: {
        'ListData': 'setDetail',
        'ListLayout': 'setLayout',
        'List': 'mergeList',
        'ListRelation': 'addListRelation',
    },
};

const actions = {
    update({ dispatch },action){
        dispatch('post',{ action,update:true },{ root:true });
    },
    updateRelation({ dispatch },request){
        dispatch('post',request,{ root:true });
    },
    addListRelation({ state,commit },{ ListRelation,_response_data }) {
        let { action,id } = _response_data.request, list = _response_data.Resolve[action]['idn2'], data = ListRelation[list][id];
        if (!state.relation[list] || !state.relation[list][id]) commit('createRelation', { list,id });
        if(!_.isEmpty(data)) commit('addRelation',{ list,id,data })
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
    createRelation(state,{ list,id }){
        if(!state.relation[list])
            state.relation = Object.assign({},state.relation,_.zipObject([list],[{}]));
        if(!state.relation[list][id])
            state.relation[list] = Object.assign({},state.relation[list],_.zipObject([id],[[]]))
    },
    addRelation(state,{ list,id,data }){ data = _.concat(state.relation[list][id],data); state.relation[list] = Object.assign({},state.relation[list],_.zipObject([id],[data])); },
};

const getters = {
    list(state){ return (id) => state.lists[id] },
    layout(state){ return (id) => state.layout[id] },
    details(state){ return (id) => state.details[id] },
    selected(state){ return (id) => state.selected[id] },
    relation(state){ return (list,id) => state.relation[list][id] },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}