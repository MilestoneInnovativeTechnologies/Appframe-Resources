const state = {
    store: {},
    handler: {
        'Data': 'addData'
    }
};

const actions = {

};

const mutations = {
    addData(state,{ Data }){
        let id = _.keys(Data)[0], Obj = {}; Obj[id] = {};
        if(!state.store[id]) { state.store = Object.assign({},state.store,Obj); }
        if(_.isEmpty(Data[id])) return; let data = {}; data[Data[id].id] = Data[id]; state.store[id] = Object.assign({},state.store[id],data);
    },
};

const getters = {
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}