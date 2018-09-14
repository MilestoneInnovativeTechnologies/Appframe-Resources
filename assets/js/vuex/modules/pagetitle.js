const state = {
    title: {},
    handler: {
        Resolve: 'addResolveTitle',
        Data: 'changeDataTitle',
    }
};

const actions = {
    addResolveTitle({ commit },{ _response_data,Resolve }){
        let action = _response_data.request.action, type = Resolve[action].type, mutate = 'set'+type+'Title', payload = Object.assign({},_response_data.request,Resolve[action]), fetchProps = titleFetchProperty[type];
        fetchProps = (!_.isArray(fetchProps)) ? [fetchProps] : fetchProps; _.forEach(fetchProps,(prop,index) => payload['data'+index] = _.get(_response_data,prop));
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
    setFormTitle(state,{ action,data0 }){
        if(!state.title[action]) state.title = Object.assign({},state.title,_.fromPairs([[action,{'*':null}]]));
        let title = _.values(data0)[0].title; state.title[action]['*'] = title;
    },
    setListTitle(state,{ action,data0 }){
        if(!state.title[action]) state.title = Object.assign({},state.title,_.fromPairs([[action,{'*':null}]]));
        let title = _.values(data0)[0].title; state.title[action]['*'] = title;
    },
    setDataTitle(state,{ action,data0,data1,id }){
        if(!state.title[action]) state.title = Object.assign({},state.title,getDataActionObj(action,data0,id));
        state.title[action][id] = _.get(_.values(data1)[0],state.title[action].path);
    },
    changeDataTitle(state,{ Data,_response_data }){
        let action = _response_data.request.action, record = _response_data.request.id, data = _.keys(Data)[0];
        if(!Data || !Data[data]) return; if(!state.title[action][record]) state.title[action] = Object.assign({},state.title[action],_.fromPairs([[record,null]]));
        let titleAction = state.title[action];
        titleAction[record] = (titleAction.path) ? _.get(Data[data],titleAction.path) : [titleAction.form,_.get(Data[data],titleAction.data)].join(', ');
    },
    setFormWithDataTitle(state,{ action,data0,idn1,data1,idn2,id,data2 }){
        if(!state.title[action]) state.title = Object.assign({},state.title,
            _.zipObject([action],[_.zipObject(['form','data',id],[data0[idn1].title,data1[idn2].title_field,null])]));
        state.title[action][id] = [state.title[action].form,_.get(data2[idn2],state.title[action].data)].join(', ');
    },
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
    Data: ['DataDetails','Data'],
    FormWithData: ['Form','DataDetails','Data'],
};

function getDataActionObj(action,data,id){
    let path = _.values(data)[0].title_field;
    let Obj = {}; Obj[action] = { path };
    Obj[action][id] = null; return Obj;
}