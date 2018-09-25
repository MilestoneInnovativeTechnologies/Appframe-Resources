const state = {
    store: { },
    handler: {
        FieldOption: 'newOption',
    },
};

const actions = {
    fetch({ dispatch },id){ dispatch('post',{ action:'option',id },{ root:true }) },
};

const mutations = {
    newOption(state,{ FieldOption }){
        _.each(FieldOption,(Option,Id) => Vue.set(state.store,Id,Option) )
    }
};

const getters = {
    get(state){ return (id) => state.store[id] }
};

export default {
    namespaced: true,
    state, getters, actions, mutations
}