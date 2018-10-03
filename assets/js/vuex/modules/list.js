const state = {
    lists: {},
    detail: {},
    layout: {},
    selected: {},
    relation: {},
    relation_update: false,
    handler: {
        'ListData': 'setDetail',
        'ListLayout': 'setLayout',
        'List': 'mergeList',
        'ListRelation': 'addListRelation',
        'ListRelationUpdated': 'setListRelationUpdate',
    },
};

const actions = {
    update({ dispatch },action){
        dispatch('post',{ action,update:true },{ root:true });
    },
    post({ dispatch },request){ dispatch('post',request,{ root:true }); },
    addListRelation({ state,rootGetters,commit },{ ListRelation,_response_data }) {
        let { action,id } = _response_data.request, rslv = rootGetters.resolution(action), relation = rslv['idn1'], list = rslv['idn2'], data = ListRelation[list][relation][id];
        if (!state.relation[list] || !state.relation[list][relation] || !state.relation[list][relation][id]) commit('createRelation', { list,relation,id });
        commit('setRelation',{ list,relation,id,data })
    },
    updateRelation({ getters,dispatch },{ action,id,list,relation }){
        let data = getters.relation(list,relation,id);
        dispatch('post',{ action,id,data },{ root:true });
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
    createRelation(state,{ list,relation,id }){
        if(!state.relation[list]) state.relation = Object.assign({},state.relation,_.zipObject([list],[{}]));
        if(!state.relation[list][relation]) state.relation[list] = Object.assign({},state.relation[list],_.zipObject([relation],[{}]))
        if(!state.relation[list][relation][id]) state.relation[list][relation] = Object.assign({},state.relation[list][relation],_.zipObject([id],[[]]))
    },
    setRelation(state,{ list,relation,id,data }){
        //Array.prototype.push.apply(state.relation[list][relation][id],data);
        state.relation[list][relation][id] = data
    },
    updateRelation(state,{ list,relation,id,data,status }){
        if(status) state.relation[list][relation][id].push(data);
        else _.pull(state.relation[list][relation][id],_.toString(data),_.toInteger(data));
    },
    setListRelationUpdate(state){ state.relation_update = true; },
    delListRelationUpdate(state){ state.relation_update = false; },
};

const getters = {
    list(state){ return (id) => state.lists[id] },
    layout(state){ return (id) => state.layout[id] },
    details(state){ return (id) => state.detail[id] },
    selected(state){ return (id) => state.selected[id] },
    relation(state){ return (list,relation,id) => state.relation[list][relation][id] },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}