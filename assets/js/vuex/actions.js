
export default {

    routeChange({ commit,dispatch }, payload){
        let name = payload.from.name || payload.to.name;
        commit('setPageTitle',null); commit('setRouteParams',payload.to.params);
        if(name && routeActionMap[name]){
            let routeActions = _.isArray(routeActionMap[name]) ? routeActionMap[name] : [routeActionMap[name]];
            _.forEach(routeActions,action => dispatch(action,payload) );
        }
        payload.next();
    },

    serverRequestInterceptor({ commit,dispatch,getters },config){
        config.headers['X-Appframe-Token'] = getters.authToken;
        commit('pageLoading',true);
        return config;
    },

    serverResponseInterceptor({ dispatch,commit },response){
        commit('AUTH/respStatus',response.status); commit('AUTH/setToken',response.headers['x-appframe-token']); commit('pageLoading',false);
        dispatch(itemTypeActionMap[response.data.request.item.type],response);
        dispatch('SPST/processServerPostQueue');
        return response;
    },



};

let routeActionMap = {
    'menu-action': ['MACT/prepareAndSetRequest','CONT/setContentDetails']
};

let itemTypeActionMap = {
    'Form': 'FORM/newItem',
    'List': 'LIST/mergeList',
};

