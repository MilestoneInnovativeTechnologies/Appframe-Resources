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
            data = _.get(_response_data,titleFetchProperty[type]), data2 = _.get(_response_data,titleFetchProperty2[type]);
        commit(mutate,{ action,data,data2 })
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
        if(!state.title[action]) state.title = Object.assign({},state.title,_.fromPairs([[action,null]]));
        let title = _.values(data)[0].title; state.title[action] = title;
    },
    setListTitle(state,{ action,data }){
        if(!state.title[action]) state.title = Object.assign({},state.title,_.fromPairs([[action,null]]));
        let title = _.values(data)[0].title; state.title[action] = title;
    },
    setDataTitle(state,{ action,data,data2 }){
        if(!state.title[action]) state.title = Object.assign({},state.title,_.fromPairs([[action,{ path:null,title:null }]]));
        state.title[action]['path'] = _.values(data)[0].title_field; state.title[action]['title'] = _.get(data2,state.title[action]['path']);
    },
    changeDataTitle(state,{ Data,_response_data }){
        let action = _response_data.request.action, id = _.keys(Data)[0];
        if(!Data || !Data[id] || !state['title'][action] || !state['title'][action].path) return;
        state.title[action].title = _.get(Data[id],state.title[action].path);
    }
};

const getters = {
    title(state){ return (action) => _.isObject(state.title[action]) ? state.title[action].title : state.title[action] },
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
    Data: 'Data',
};