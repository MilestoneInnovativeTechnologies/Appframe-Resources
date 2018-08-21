
export default {

    routeChange({ commit,dispatch }, payload){
        let name = payload.from.name || payload.to.name;
        commit('setRouteParams',payload.to.params);
        if(name && routeActionMap[name]){
            let routeActions = _.isArray(routeActionMap[name]) ? routeActionMap[name] : [routeActionMap[name]];
            _.forEach(routeActions,action => dispatch(action,payload) );
        }
        payload.next();
    },

    serverRequestInterceptor({ state,dispatch,commit },config){
        let { actions,mutations } = state.serverInterceptors.request;
        _.forEach(actions,function(action){ dispatch(action,config) });
        _.forEach(mutations,function(mutation){ commit(mutation,config) });
    },

    serverResponseInterceptor({ state,dispatch,commit },response){
        let { actions,mutations } = state.serverInterceptors.response;
        _.forEach(actions,function(action){ dispatch(action,response) });
        _.forEach(mutations,function(mutation){ commit(mutation,response) });
        //dispatch(itemTypeActionMap[response.data.request.item.type],response);
        //dispatch('SPST/processServerPostQueue');
        //return response;
    },



};

let routeActionMap = {
    'menu-action': ['MACT/prepareAndSetRequest','CONT/setContentDetails']
};

let itemTypeActionMap = {
    'Form': 'FORM/newItem',
    'List': 'LIST/mergeList',
};

