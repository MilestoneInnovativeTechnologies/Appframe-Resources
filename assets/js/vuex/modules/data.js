const state = {
    store: {},
    updated: {},
    sections: {},
    handler: {
        'Data': 'addData',
        'DataDetails' : 'addView'
    }
};

const actions = {
    fetch({ dispatch },request){
        dispatch('post',request,{ root:true })
    },
    update({ getters,dispatch },request){
        request['last_updated'] = getters.updated(request.data,request.id);
        dispatch('post',request,{ root:true });
    }
};

const mutations = {
    addData(state,{ Data,_response_data }){
        let id = _.keys(Data)[0], Obj = {}; Obj[id] = {};
        if(!state.store[id]) { state.store = Object.assign({},state.store,Obj); state.updated = Object.assign({},state.updated,Obj); }
        if(_.isEmpty(Data[id])) return; let recId = Data[id].id;
        state.store[id] = Object.assign({},state.store[id],_.fromPairs([[recId,Data[id]]]));
        if(!_response_data.FormData)
            state.updated[id] = Object.assign({},state.updated[id],_.fromPairs([[recId,Data[id].updated_at]]));
    },
    addView(state,{ DataDetails }){
        let id = _.keys(DataDetails)[0], sections = getExtractSectionAndItems(DataDetails[id].sections);
        state.sections = Object.assign({},state.sections,_.fromPairs([[id,sections]]));
    },
};

const getters = {
    record(state){ return (data,id) => (state.store[data]) ? state.store[data][id] : null },
    updated(state){ return (data,id) => (state.updated[data]) ? state.updated[data][id] : null },
    section(state){ return (data) => state.sections[data] },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}

function getExtractSectionAndItems(data) {
    return _.map(data,function(obj){
        let secObj = _.pick(obj,['title','title_field','colspan']);
        secObj['relation'] = getRelationMethod(obj.relation);
        let items = _(obj.items).keyBy('label').mapValues(function(itemObj){ obj = _.pick(itemObj,['attribute']);
        obj.relation = getRelationMethod(itemObj.relation); return obj; }).value() ;
        return Object.assign(secObj,{ items });
    })
}
function getRelationMethod(relation){
    return (relation) ? _.snakeCase(relation.method) : null;
}