const state = {
    title: {},
    handler: {
        Resolve: 'addResolveTitle',
        Data: 'changeDataTitle',
    }
};

const actions = {
    addResolveTitle({ commit },{ _response_data,Resolve }){
        let action = _response_data.request.action, type = Resolve[action].type, mutate = 'set'+type+'Title',
            data = _.get(_response_data,titleFetchProperty[type]), data2 = _.get(_response_data,titleFetchProperty2[type]),
            payload = Object.assign({},_response_data.request,{ data,data2 });
        commit(mutate,payload)
    }
};

const mutations = {
    setStateProp(state,ary){
        _.reduce(ary,function(State,Prop){
            if(!State[Prop]) State = Object.assign(State,_.fromPairs([[Prop,null]]));
            return State[Prop];
        },state)
    },
    setFormTitle(state,{ action,data }){
        if(!state.title[action]) state.title = Object.assign({},state.title,_.fromPairs([[action,{'*':null}]]));
        let title = _.values(data)[0].title; state.title[action]['*'] = title;
    },
    setListTitle(state,{ action,data }){
        if(!state.title[action]) state.title = Object.assign({},state.title,_.fromPairs([[action,{'*':null}]]));
        let title = _.values(data)[0].title; state.title[action]['*'] = title;
    },
    setDataTitle(state,{ action,data,data2,id }){
        if(!state.title[action]) state.title = Object.assign({},state.title,getDataActionObj(action,data,id));
        state.title[action][id] = _.get(_.values(data2)[0],state.title[action].path);
    },
    changeDataTitle(state,{ Data,_response_data }){
        let action = _response_data.request.action, record = _response_data.request.id, data = _.keys(Data)[0];
        if(!Data || !Data[data]) return; if(!state.title[action][record]) state.title[action] = Object.assign({},state.title[action],_.fromPairs([[record,null]]));
        state.title[action][record] = _.get(Data[data],state.title[action].path);
    }
};

const getters = {
    title(state){
        return function title(action,id) { if(!action) return '';
            let actObj = state.title[action]; if(!actObj) return '';
            id = (actObj['*']) ? '*' : id; return state.title[action][id];
        };
    },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
};

const titleFetchProperty = {
    Form: 'Form',
    List: 'ListData',
    Data: 'DataDetails',
};

const titleFetchProperty2 = {
    Data: 'Data'
};

function getDataActionObj(action,data,id){
    let path = _.values(data)[0].title_field;
    let Obj = {}; Obj[action] = { path };
    Obj[action][id] = null; return Obj;
}