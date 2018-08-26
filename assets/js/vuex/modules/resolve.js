const state = {
    actions: {},
    handler: {
        'Resolve':'storeResolve',
    }
};

const actions = {
    beforeEachRoute({ commit,dispatch },{ to }){
        if(!to.params.action) return;
        dispatch('resolveAction',to.params.action);
        commit('proceedRoute',null,{ root:true })
    },
    resolveAction({ state,dispatch },action){
        if(!state.actions[action]) return dispatch('fetchAction',action);
    },
    fetchAction({ dispatch },action){
        dispatch('post',{ action },{ root:true })
    },
};

const mutations = {
    storeResolve(state,{ Resolve }){
        state.actions = Object.assign({},state.actions,Resolve)
    }
};

const getters = {
    resolution(state){ return (action) => state.actions[action] },
    action(state){ return (criteria) => getMatchedObjectKey(state.actions,criteria) },
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}

function getMatchedObjectKey(Obj,Criteria){
    let matched = null;
    _.forEach(Obj,function(data,key){
        if(hasObjectSame(data,Criteria)){
            matched = key;
            return false;
        }
    });
    return matched;
}

function hasObjectSame(SourceObj,CheckObj){
    let check = true;
    _.forEach(CheckObj,function(value,key){
        if(!SourceObj.hasOwnProperty(key) || SourceObj[key] != value){
            check = false; return false;
        }
    });
    return check;
}